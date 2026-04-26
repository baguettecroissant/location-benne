#!/usr/bin/env python3
"""
🚛 Scraper Loueurs de Benne — Via API Gouvernement (100% gratuit, 0 blocage)
Source: recherche-entreprises.api.gouv.fr (API ouverte, pas de clé nécessaire)

Étape 1: Trouve toutes les entreprises de location de benne via l'API gouv
Étape 2: Visite leurs sites web pour extraire les emails
Exporte en CSV compatible Google Sheet

Usage:
    pip3 install requests beautifulsoup4
    python3 scraper_gouv.py
"""

import csv
import time
import random
import re
import sys
from typing import Optional, List, Dict
from urllib.parse import quote_plus, urlparse
from pathlib import Path

import requests
from bs4 import BeautifulSoup
import warnings
warnings.filterwarnings("ignore")

# ─── CONFIG ──────────────────────────────────────────────────────────

OUTPUT_FILE = "prospects_loueurs_benne.csv"

# API Gouvernement — recherche d'entreprises
GOV_API = "https://recherche-entreprises.api.gouv.fr/search"

# Termes de recherche pour trouver les loueurs de benne
SEARCH_TERMS = [
    "location benne",
    "location de benne",
    "évacuation gravats",
    "benne gravats",
    "location benne chantier",
]

# Codes NAF pertinents (activité principale)
# 3811Z = Collecte déchets non dangereux
# 3821Z = Traitement déchets non dangereux  
# 7732Z = Location machines BTP
# 4399C = Travaux de maçonnerie générale
NAF_CODES = ["38.11Z", "38.21Z", "77.32Z", "43.99C", "38.32Z"]

# Départements (code)
DEPARTEMENTS = [
    "75", "77", "78", "91", "92", "93", "94", "95",  # Île-de-France
    "69", "13", "59", "33", "31", "44", "34", "06",  # Grandes métropoles
    "67", "38", "76", "83", "57", "35", "62", "29",
    "74", "42", "21", "45", "37", "49", "56", "30",
    "68", "54", "01", "63", "64", "17", "14", "22",
    "60", "80", "27", "51", "25", "87", "86", "79",
    "71", "73", "26", "84", "11", "66", "40", "47",
    "24", "16", "36", "18", "41", "28", "72", "53",
    "50", "61", "10", "52", "55", "88", "39", "70",
    "58", "89", "03", "43", "15", "46", "12", "81",
    "82", "32", "65", "09",
]

HEADERS_BROWSER = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                  "AppleWebKit/537.36 (KHTML, like Gecko) "
                  "Chrome/125.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "fr-FR,fr;q=0.9,en-US;q=0.8",
    "Accept-Encoding": "gzip, deflate",
    "Connection": "keep-alive",
    "Upgrade-Insecure-Requests": "1",
}

# ─── API GOUVERNEMENT ────────────────────────────────────────────────

def search_gov_api(query, departement, page=1):
    """Recherche d'entreprises via l'API gouvernement (gratuit, illimité)."""
    try:
        params = {
            "q": query,
            "departement": departement,
            "page": page,
            "per_page": 25,
            "mtm_campaign": "prix-location-benne",
        }
        resp = requests.get(GOV_API, params=params, timeout=15)
        if resp.status_code == 200:
            return resp.json()
        else:
            return None
    except Exception as e:
        print(f"    ⚠️ Erreur API: {e}")
        return None


def extract_companies_from_gov(departement):
    """Extrait toutes les entreprises de location de benne d'un département."""
    companies = []
    seen_sirets = set()

    for term in SEARCH_TERMS:
        for page in range(1, 4):  # Max 3 pages par terme
            data = search_gov_api(term, departement, page)
            if not data or not data.get("results"):
                break

            for r in data["results"]:
                siren = r.get("siren", "")
                if siren in seen_sirets:
                    continue
                seen_sirets.add(siren)

                nom = r.get("nom_complet", "") or r.get("nom_raison_sociale", "")
                if not nom:
                    continue

                # Récupérer le siège social
                siege = r.get("siege", {})
                cp = siege.get("code_postal", "")
                ville = siege.get("libelle_commune", "")
                adresse = siege.get("adresse", "") or ""

                # Activité
                activite = siege.get("activite_principale", "")
                libelle_activite = siege.get("libelle_activite_principale", "")

                # Dirigeants
                dirigeants = r.get("dirigeants", [])
                contact_name = ""
                if dirigeants:
                    d = dirigeants[0]
                    prenom = d.get("prenom", "") or ""
                    nom_d = d.get("nom", "") or ""
                    contact_name = f"{prenom} {nom_d}".strip()

                companies.append({
                    "entreprise": nom.title(),
                    "contact": contact_name.title(),
                    "siren": siren,
                    "adresse": adresse,
                    "code_postal": cp,
                    "ville": ville.title() if ville else "",
                    "departement": departement,
                    "activite": libelle_activite or activite,
                    "email": "",
                    "telephone": "",
                    "site_web": "",
                })

            time.sleep(0.3)  # Politesse API

    return companies


# ─── ENRICHISSEMENT : TROUVER EMAIL + SITE WEB ──────────────────────

def find_website_and_email(company):
    """
    Cherche le site web d'une entreprise via une recherche Google simple,
    puis visite le site pour extraire l'email.
    Astuce: on utilise DuckDuckGo HTML (pas de JS, pas de captcha).
    """
    nom = company["entreprise"]
    ville = company["ville"]
    query = f"{nom} {ville} location benne"

    # DuckDuckGo HTML — pas de captcha, pas de JS requis
    try:
        url = f"https://html.duckduckgo.com/html/?q={quote_plus(query)}"
        time.sleep(random.uniform(1.5, 3))
        resp = requests.get(url, headers=HEADERS_BROWSER, timeout=10)

        if resp.status_code != 200:
            return company

        soup = BeautifulSoup(resp.text, "html.parser")

        # Extraire les URLs des résultats DDG
        links = []
        for a in soup.select("a.result__a"):
            href = a.get("href", "")
            if href and "duckduckgo" not in href:
                # DDG encode les URLs, extraire la vraie URL
                if "uddg=" in href:
                    import urllib.parse
                    parsed = urllib.parse.parse_qs(urllib.parse.urlparse(href).query)
                    real_url = parsed.get("uddg", [""])[0]
                    if real_url:
                        href = real_url
                if is_business_site(href):
                    links.append(href)

        # Visiter le premier site trouvé pour extraire l'email
        for site_url in links[:3]:
            try:
                company["site_web"] = site_url
                email = scrape_email_from_site(site_url)
                if email:
                    company["email"] = email
                    return company
            except Exception:
                continue

    except Exception as e:
        pass

    return company


def is_business_site(url):
    """Vérifie que c'est un vrai site d'entreprise."""
    blacklist = [
        "facebook.com", "instagram.com", "linkedin.com", "twitter.com",
        "youtube.com", "wikipedia.org", "pagesjaunes.fr", "google.com",
        "yelp.com", "tripadvisor", "leboncoin.fr", "societe.com",
        "annuaire", "kompass", "mappy", "infobel", "europages",
        "duckduckgo.com", "prix-location-benne.fr",
    ]
    url_lower = url.lower()
    return url.startswith("http") and not any(bl in url_lower for bl in blacklist)


def scrape_email_from_site(url):
    """Visite un site web et extrait l'email de contact."""
    try:
        time.sleep(random.uniform(1, 2.5))
        resp = requests.get(
            url, headers=HEADERS_BROWSER, timeout=8,
            allow_redirects=True, verify=False
        )
        if resp.status_code != 200:
            return ""

        emails = extract_emails(resp.text)
        if emails:
            return emails[0]

        # Essayer la page contact
        base = url.rstrip("/")
        for path in ["/contact", "/nous-contacter", "/contactez-nous", "/contact.html", "/contact.php"]:
            try:
                time.sleep(0.8)
                r2 = requests.get(
                    base + path, headers=HEADERS_BROWSER,
                    timeout=6, allow_redirects=True, verify=False
                )
                if r2.status_code == 200:
                    emails = extract_emails(r2.text)
                    if emails:
                        return emails[0]
            except Exception:
                continue

        return ""
    except Exception:
        return ""


def extract_emails(html):
    """Extrait les emails d'un contenu HTML."""
    # Décoder les mailto: d'abord
    raw = re.findall(
        r'[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}',
        html
    )
    blacklist = [
        "example", "test", "wix", "sentry", "wordpress", "w3.org",
        "schema.org", "googleapis", "google", "cloudflare", "jquery",
        "bootstrap", "fontawesome", "gstatic", "gravatar",
        "protection", "placeholder", "noreply", "no-reply"
    ]
    seen = set()
    clean = []
    for em in raw:
        em_lower = em.lower()
        if (em_lower not in seen
            and not any(bl in em_lower for bl in blacklist)
            and len(em_lower) < 60
            and "." in em_lower.split("@")[1]):
            clean.append(em_lower)
            seen.add(em_lower)
    return clean


# ─── DÉDUPLICATIONS ─────────────────────────────────────────────────

def deduplicate(prospects):
    """Déduplique par SIREN, puis par email."""
    seen_siren = set()
    seen_email = set()
    unique = []
    for p in prospects:
        siren = p.get("siren", "")
        email = p.get("email", "")

        if siren and siren in seen_siren:
            continue
        if email and email in seen_email:
            continue

        if siren:
            seen_siren.add(siren)
        if email:
            seen_email.add(email)
        unique.append(p)
    return unique


# ─── EXPORT CSV ──────────────────────────────────────────────────────

def export_csv(prospects, filename):
    """Exporte en CSV compatible Google Sheet."""
    fieldnames = [
        "entreprise", "contact", "email", "telephone",
        "departement", "codes_postaux", "source",
        "statut", "site_web", "ville", "activite"
    ]

    rows = []
    for p in prospects:
        rows.append({
            "entreprise": p["entreprise"],
            "contact": p["contact"],
            "email": p["email"],
            "telephone": p.get("telephone", ""),
            "departement": f"{p.get('ville', '')} ({p['departement']})",
            "codes_postaux": p.get("code_postal", p["departement"]),
            "source": "API Gouv + Site Web",
            "statut": "À contacter" if p["email"] else "Pas d'email",
            "site_web": p.get("site_web", ""),
            "ville": p.get("ville", ""),
            "activite": p.get("activite", ""),
        })

    with open(filename, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)


# ─── MAIN ────────────────────────────────────────────────────────────

def main():
    print("=" * 60)
    print("🚛 SCRAPER LOUEURS DE BENNE — API Gouvernement + Emails")
    print("   Source: recherche-entreprises.api.gouv.fr (gratuit)")
    print("=" * 60)

    all_companies = []
    total_depts = len(DEPARTEMENTS)

    # ── PHASE 1: Récupérer les entreprises via API gouv ──
    print(f"\n📋 PHASE 1: Recherche de {total_depts} départements via API gouv...\n")

    for idx, dept in enumerate(DEPARTEMENTS, 1):
        sys.stdout.write(f"\r  [{idx}/{total_depts}] Département {dept}...")
        sys.stdout.flush()
        companies = extract_companies_from_gov(dept)
        all_companies.extend(companies)
        sys.stdout.write(f" → {len(companies)} entreprises trouvées")
        sys.stdout.flush()
        print()

    # Dédupliquer
    all_companies = deduplicate(all_companies)
    print(f"\n📊 Total entreprises uniques: {len(all_companies)}")

    # ── PHASE 2: Enrichir avec emails ──
    print(f"\n📧 PHASE 2: Recherche d'emails sur les sites web...\n")

    emails_found = 0
    total = len(all_companies)

    for idx, company in enumerate(all_companies, 1):
        pct = int(idx / total * 100)
        sys.stdout.write(
            f"\r  [{idx}/{total}] ({pct}%) {company['entreprise'][:35]:35s} "
            f"| Emails: {emails_found}"
        )
        sys.stdout.flush()

        company = find_website_and_email(company)
        all_companies[idx - 1] = company

        if company["email"]:
            emails_found += 1

        # Sauvegarder régulièrement (toutes les 50 entreprises)
        if idx % 50 == 0:
            export_csv(all_companies, OUTPUT_FILE)

    print(f"\n\n{'=' * 60}")
    print(f"📊 RÉSULTAT FINAL:")
    print(f"   Total entreprises:  {len(all_companies)}")
    print(f"   Avec email:         {emails_found}")
    print(f"   Sans email:         {len(all_companies) - emails_found}")
    print(f"{'=' * 60}")

    # Export final
    export_csv(all_companies, OUTPUT_FILE)
    print(f"\n✅ Fichier exporté: {Path(OUTPUT_FILE).absolute()}")
    print(f"\n📌 Prochaine étape:")
    print(f"   1. Ouvrez le CSV dans Google Sheet")
    print(f"   2. Filtrez la colonne 'statut' = 'À contacter'")
    print(f"   3. Lancez le Google Apps Script pour envoyer les mails")


if __name__ == "__main__":
    main()
