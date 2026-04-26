#!/usr/bin/env python3
"""
🔍 Scraper d'emails — Loueurs de bennes en France
Scrape les Pages Jaunes pour trouver les loueurs de benne par département.
Exporte en CSV compatible avec le Google Sheet de prospection.

Usage:
    pip install requests beautifulsoup4
    python scraper_loueurs.py
"""

import csv
import time
import random
import re
import json
from typing import Optional, List, Dict
from urllib.parse import quote_plus
from pathlib import Path

try:
    import requests
    from bs4 import BeautifulSoup
except ImportError:
    print("❌ Installez les dépendances : pip install requests beautifulsoup4")
    exit(1)

# ─── CONFIGURATION ───────────────────────────────────────────────────

OUTPUT_FILE = "prospects_loueurs_benne.csv"

# Départements à cibler (les plus peuplés en premier)
DEPARTEMENTS = [
    ("75", "Paris"), ("69", "Rhône"), ("13", "Bouches-du-Rhône"),
    ("59", "Nord"), ("33", "Gironde"), ("31", "Haute-Garonne"),
    ("44", "Loire-Atlantique"), ("34", "Hérault"), ("67", "Bas-Rhin"),
    ("06", "Alpes-Maritimes"), ("77", "Seine-et-Marne"), ("78", "Yvelines"),
    ("91", "Essonne"), ("92", "Hauts-de-Seine"), ("93", "Seine-Saint-Denis"),
    ("94", "Val-de-Marne"), ("95", "Val-d'Oise"), ("38", "Isère"),
    ("76", "Seine-Maritime"), ("83", "Var"), ("57", "Moselle"),
    ("35", "Ille-et-Vilaine"), ("62", "Pas-de-Calais"), ("29", "Finistère"),
    ("74", "Haute-Savoie"), ("42", "Loire"), ("21", "Côte-d'Or"),
    ("45", "Loiret"), ("37", "Indre-et-Loire"), ("49", "Maine-et-Loire"),
    ("56", "Morbihan"), ("30", "Gard"), ("68", "Haut-Rhin"),
    ("54", "Meurthe-et-Moselle"), ("01", "Ain"), ("63", "Puy-de-Dôme"),
    ("64", "Pyrénées-Atlantiques"), ("17", "Charente-Maritime"),
    ("14", "Calvados"), ("22", "Côtes-d'Armor"),
]

KEYWORDS = [
    "location de benne",
    "location benne gravats",
    "évacuation gravats",
    "loueur de benne",
]

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                  "AppleWebKit/537.36 (KHTML, like Gecko) "
                  "Chrome/120.0.0.0 Safari/537.36",
    "Accept-Language": "fr-FR,fr;q=0.9",
    "Accept": "text/html,application/xhtml+xml",
}


# ─── SCRAPING PAGES JAUNES ──────────────────────────────────────────

def scrape_pagesjaunes(keyword: str, location: str, dept_code: str) -> List[dict]:
    """Scrape les résultats Pages Jaunes pour un mot-clé + localisation."""
    results = []
    encoded_kw = quote_plus(keyword)
    encoded_loc = quote_plus(location)

    for page in range(1, 4):  # Max 3 pages
        url = (
            f"https://www.pagesjaunes.fr/annuaire/chercherlespros"
            f"?quoiqui={encoded_kw}&ou={encoded_loc}&page={page}"
        )

        try:
            time.sleep(random.uniform(3, 6))
            resp = requests.get(url, headers=HEADERS, timeout=15)

            if resp.status_code != 200:
                print(f"  ⚠️ HTTP {resp.status_code} pour {url}")
                break

            soup = BeautifulSoup(resp.text, "html.parser")

            # Chercher les blocs de résultats
            listings = soup.select("li.bi-generic, div.bi-bloc")
            if not listings:
                # Essai alternatif
                listings = soup.select("[data-pjlid]")

            if not listings:
                break

            for item in listings:
                biz = parse_pagesjaunes_listing(item, dept_code, location)
                if biz and biz["email"]:
                    results.append(biz)

        except Exception as e:
            print(f"  ❌ Erreur scraping PJ: {e}")
            break

    return results


def parse_pagesjaunes_listing(item, dept_code: str, location: str) -> Optional[dict]:
    """Parse un bloc de résultat Pages Jaunes."""
    try:
        # Nom de l'entreprise
        name_el = item.select_one("h3 a, .denomination-links a, .bi-denomination a")
        name = name_el.get_text(strip=True) if name_el else ""

        if not name:
            return None

        # Téléphone
        phone_el = item.select_one("[data-phone], .bi-phone .coord-value, .number-phone")
        phone = phone_el.get_text(strip=True) if phone_el else ""

        # Adresse
        addr_el = item.select_one(".bi-address .bi-address-street, .adresse")
        addr = addr_el.get_text(strip=True) if addr_el else ""

        # Email — souvent masqué, on essaie
        email = ""
        email_el = item.select_one("a[href^='mailto:']")
        if email_el:
            email = email_el["href"].replace("mailto:", "").strip()

        # Lien vers la fiche (pour scraper l'email dessus)
        link_el = item.select_one("h3 a, .denomination-links a")
        detail_url = ""
        if link_el and link_el.get("href"):
            href = link_el["href"]
            if href.startswith("/"):
                detail_url = "https://www.pagesjaunes.fr" + href
            elif href.startswith("http"):
                detail_url = href

        # Si pas d'email, tenter la page de détail
        if not email and detail_url:
            email = scrape_detail_page_email(detail_url)

        return {
            "entreprise": name,
            "contact": "",
            "email": email,
            "telephone": clean_phone(phone),
            "departement": f"{location} ({dept_code})",
            "codes_postaux": dept_code,
            "source": "Pages Jaunes",
        }

    except Exception:
        return None


def scrape_detail_page_email(url: str) -> str:
    """Visite la page détail d'un pro pour extraire son email."""
    try:
        time.sleep(random.uniform(2, 4))
        resp = requests.get(url, headers=HEADERS, timeout=10)
        if resp.status_code != 200:
            return ""

        # Chercher un mailto:
        emails = re.findall(
            r'[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}',
            resp.text
        )

        # Filtrer les faux positifs
        blacklist = ["example.com", "pagesjaunes", "solocal", "test.com", "email.com"]
        for em in emails:
            if not any(bl in em.lower() for bl in blacklist):
                return em.lower()

    except Exception:
        pass
    return ""


# ─── SCRAPING GOOGLE (fallback) ─────────────────────────────────────

def scrape_google_results(keyword: str, dept: str) -> List[dict]:
    """
    Scrape les résultats Google pour trouver les sites web des loueurs,
    puis visite ces sites pour extraire les emails.
    """
    results = []
    query = quote_plus(f"{keyword} {dept}")
    url = f"https://www.google.fr/search?q={query}&num=20&hl=fr"

    try:
        time.sleep(random.uniform(4, 8))
        resp = requests.get(url, headers=HEADERS, timeout=15)

        if resp.status_code != 200:
            return results

        soup = BeautifulSoup(resp.text, "html.parser")

        # Extraire les liens des résultats
        for a in soup.select("a[href]"):
            href = a["href"]
            # Filtrer les vrais résultats
            if "/url?q=" in href:
                real_url = href.split("/url?q=")[1].split("&")[0]
                if is_valid_business_url(real_url):
                    email = scrape_website_email(real_url)
                    if email:
                        domain = re.findall(r'https?://(?:www\.)?([^/]+)', real_url)
                        results.append({
                            "entreprise": domain[0] if domain else real_url,
                            "contact": "",
                            "email": email,
                            "telephone": "",
                            "departement": dept,
                            "codes_postaux": "",
                            "source": "Google",
                        })

    except Exception as e:
        print(f"  ❌ Erreur Google: {e}")

    return results


def is_valid_business_url(url: str) -> bool:
    """Filtre les URLs qui ne sont pas des sites de loueurs."""
    blacklist = [
        "pagesjaunes", "google", "facebook", "instagram", "linkedin",
        "youtube", "twitter", "wikipedia", "yelp", "tripadvisor",
        "leboncoin", "prix-location-benne"  # notre propre site
    ]
    return not any(bl in url.lower() for bl in blacklist)


def scrape_website_email(url: str) -> str:
    """Visite un site web et extrait l'email de contact."""
    try:
        time.sleep(random.uniform(2, 4))
        resp = requests.get(url, headers=HEADERS, timeout=10, allow_redirects=True)
        if resp.status_code != 200:
            return ""

        # Pages de contact courantes
        contact_pages = ["/contact", "/nous-contacter", "/contactez-nous"]
        emails_found = extract_emails_from_html(resp.text)

        # Si pas d'email sur la homepage, essayer la page contact
        if not emails_found:
            for page in contact_pages:
                try:
                    contact_url = url.rstrip("/") + page
                    time.sleep(1)
                    r2 = requests.get(contact_url, headers=HEADERS, timeout=8)
                    if r2.status_code == 200:
                        emails_found = extract_emails_from_html(r2.text)
                        if emails_found:
                            break
                except Exception:
                    continue

        return emails_found[0] if emails_found else ""

    except Exception:
        return ""


def extract_emails_from_html(html: str) -> List[str]:
    """Extrait les adresses email d'un contenu HTML."""
    emails = re.findall(
        r'[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}',
        html
    )
    blacklist = [
        "example", "test", "wixpress", "sentry", "wordpress",
        "googleapis", "google", "facebook", "cloudflare",
        "schema.org", "w3.org", "jquery"
    ]
    clean = []
    seen = set()
    for em in emails:
        em_lower = em.lower()
        if em_lower not in seen and not any(bl in em_lower for bl in blacklist):
            clean.append(em_lower)
            seen.add(em_lower)
    return clean


# ─── UTILS ───────────────────────────────────────────────────────────

def clean_phone(phone: str) -> str:
    """Nettoie un numéro de téléphone."""
    return re.sub(r'[^\d+]', '', phone)


def deduplicate(prospects: List[dict]) -> List[dict]:
    """Déduplique par email."""
    seen = set()
    unique = []
    for p in prospects:
        if p["email"] and p["email"] not in seen:
            seen.add(p["email"])
            unique.append(p)
    return unique


# ─── MAIN ────────────────────────────────────────────────────────────

def main():
    print("=" * 60)
    print("🚛 SCRAPER LOUEURS DE BENNE — France")
    print("=" * 60)

    all_prospects = []

    for dept_code, dept_name in DEPARTEMENTS:
        print(f"\n📍 {dept_name} ({dept_code})...")

        for keyword in KEYWORDS[:2]:  # 2 keywords par dept pour limiter les requêtes
            print(f"  🔍 Recherche: '{keyword}'...")

            # Pages Jaunes
            pj_results = scrape_pagesjaunes(keyword, dept_name, dept_code)
            print(f"    → Pages Jaunes: {len(pj_results)} résultats avec email")
            all_prospects.extend(pj_results)

            # Google (fallback)
            g_results = scrape_google_results(keyword, dept_name)
            print(f"    → Google: {len(g_results)} résultats avec email")
            all_prospects.extend(g_results)

        print(f"  ✅ Total brut: {len(all_prospects)} prospects")

    # Dédupliquer
    unique = deduplicate(all_prospects)
    print(f"\n{'=' * 60}")
    print(f"📊 RÉSULTAT FINAL: {len(unique)} prospects uniques avec email")
    print(f"{'=' * 60}")

    # Export CSV
    output = Path(OUTPUT_FILE)
    with open(output, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=[
            "entreprise", "contact", "email", "telephone",
            "departement", "codes_postaux", "source"
        ])
        writer.writeheader()
        writer.writerows(unique)

    print(f"\n✅ Fichier exporté: {output.absolute()}")
    print(f"   → Importez ce CSV dans votre Google Sheet (onglet 'Prospects')")
    print(f"   → Ajoutez 'À contacter' dans la colonne Statut pour chaque ligne")


if __name__ == "__main__":
    main()
