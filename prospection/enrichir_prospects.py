#!/usr/bin/env python3
"""
📞 Enrichissement des prospects — Récupère les données détaillées 
depuis l'API data.gouv (SIREN → téléphone, email, site web)
+ Recherche Google via SerpAPI-like gratuit (DuckDuckGo Instant Answer)

Usage: python3 enrichir_prospects.py
"""

import csv
import time
import re
import sys
import json
from typing import Optional, List
from urllib.parse import quote_plus
from pathlib import Path

import requests
from bs4 import BeautifulSoup
import warnings
warnings.filterwarnings("ignore")

INPUT_FILE = "prospects_loueurs_benne.csv"
OUTPUT_FILE = "prospects_enrichis.csv"

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                  "AppleWebKit/537.36 (KHTML, like Gecko) "
                  "Chrome/125.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "fr-FR,fr;q=0.9",
}


def get_siren_details(siren):
    """Récupère les détails d'une entreprise via l'API Sirene ouverte."""
    try:
        url = f"https://recherche-entreprises.api.gouv.fr/search?q={siren}&page=1&per_page=1"
        resp = requests.get(url, timeout=10)
        if resp.status_code == 200:
            data = resp.json()
            if data.get("results"):
                return data["results"][0]
    except Exception:
        pass
    return None


def search_societe_com(entreprise, ville):
    """
    Cherche sur societe.com pour trouver le téléphone.
    Societe.com ne bloque pas les requêtes simples.
    """
    try:
        query = quote_plus(f"{entreprise} {ville}")
        url = f"https://www.societe.com/cgi-bin/search?champs={query}"
        time.sleep(1.5)
        resp = requests.get(url, headers=HEADERS, timeout=10, allow_redirects=True)
        if resp.status_code != 200:
            return None, None

        soup = BeautifulSoup(resp.text, "html.parser")
        
        # Chercher le téléphone
        phone = None
        phone_el = soup.select_one("a[href^='tel:']")
        if phone_el:
            phone = phone_el.get("href", "").replace("tel:", "").strip()

        # Chercher l'email
        email = None
        for a in soup.select("a[href^='mailto:']"):
            em = a["href"].replace("mailto:", "").strip()
            if em and "societe.com" not in em:
                email = em
                break

        return phone, email

    except Exception:
        return None, None


def search_infogreffe(siren):
    """
    Cherche sur pappers.fr (gratuit) pour les données de contact.
    """
    try:
        url = f"https://www.pappers.fr/entreprise/{siren}"
        time.sleep(1.5)
        resp = requests.get(url, headers=HEADERS, timeout=10)
        if resp.status_code != 200:
            return None, None, None

        soup = BeautifulSoup(resp.text, "html.parser")

        phone = None
        email = None
        website = None

        # Emails
        for a in soup.select("a[href^='mailto:']"):
            em = a["href"].replace("mailto:", "").strip()
            if em and "pappers" not in em:
                email = em
                break

        # Téléphone
        for a in soup.select("a[href^='tel:']"):
            ph = a["href"].replace("tel:", "").strip()
            if ph:
                phone = ph
                break

        # Site web
        for a in soup.select("a[target='_blank']"):
            href = a.get("href", "")
            if href and "http" in href and "pappers" not in href and "societe" not in href:
                website = href
                break

        return phone, email, website

    except Exception:
        return None, None, None


def search_google_phone(entreprise, ville):
    """
    Utilise DuckDuckGo Instant Answers pour trouver le téléphone.
    """
    try:
        query = f"{entreprise} {ville} téléphone"
        url = f"https://api.duckduckgo.com/?q={quote_plus(query)}&format=json&no_html=1"
        time.sleep(1)
        resp = requests.get(url, headers=HEADERS, timeout=8)
        if resp.status_code == 200:
            data = resp.json()
            abstract = data.get("Abstract", "") + " " + data.get("Answer", "")
            # Chercher un numéro de téléphone français
            phones = re.findall(r'(?:0[1-9])[\s.-]?(?:\d{2}[\s.-]?){4}', abstract)
            if phones:
                return re.sub(r'[\s.-]', '', phones[0])
    except Exception:
        pass
    return None


def main():
    print("=" * 60)
    print("📞 ENRICHISSEMENT DES PROSPECTS")
    print("   Sources: Pappers.fr + Societe.com + DuckDuckGo")
    print("=" * 60)

    # Lire le CSV existant
    input_path = Path(INPUT_FILE)
    if not input_path.exists():
        print(f"❌ Fichier {INPUT_FILE} introuvable. Lancez d'abord scraper_gouv.py")
        return

    prospects = []
    with open(input_path, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            prospects.append(row)

    total = len(prospects)
    print(f"\n📋 {total} prospects à enrichir\n")

    enriched_count = 0
    phone_count = 0
    email_count = 0

    for idx, p in enumerate(prospects, 1):
        nom = p.get("entreprise", "").strip()
        ville = p.get("ville", "").strip()
        cp = p.get("codes_postaux", "").strip()

        sys.stdout.write(f"\r  [{idx}/{total}] {nom[:40]:40s}")
        sys.stdout.flush()

        # Source 1: Pappers.fr (via le SIREN caché dans les données)
        # On cherche avec le nom de l'entreprise
        phone_p, email_p, website_p = search_infogreffe(
            quote_plus(f"{nom} {ville}")
        )

        if email_p and not p.get("email"):
            p["email"] = email_p
            email_count += 1

        if phone_p and not p.get("telephone"):
            p["telephone"] = phone_p
            phone_count += 1

        if website_p and not p.get("site_web"):
            p["site_web"] = website_p

        # Source 2: Societe.com
        if not p.get("telephone") or not p.get("email"):
            phone_s, email_s = search_societe_com(nom, ville)

            if email_s and not p.get("email"):
                p["email"] = email_s
                email_count += 1

            if phone_s and not p.get("telephone"):
                p["telephone"] = phone_s
                phone_count += 1

        # Source 3: DuckDuckGo (dernier recours pour le téléphone)
        if not p.get("telephone"):
            phone_ddg = search_google_phone(nom, ville)
            if phone_ddg:
                p["telephone"] = phone_ddg
                phone_count += 1

        # Mettre à jour le statut
        if p.get("email"):
            p["statut"] = "À contacter"
        elif p.get("telephone"):
            p["statut"] = "Tel seulement"

        if p.get("email") or p.get("telephone"):
            enriched_count += 1

    # Export
    fieldnames = list(prospects[0].keys()) if prospects else []
    with open(OUTPUT_FILE, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(prospects)

    print(f"\n\n{'=' * 60}")
    print(f"📊 RÉSULTAT ENRICHISSEMENT:")
    print(f"   Total prospects:    {total}")
    print(f"   Avec email:         {email_count}")
    print(f"   Avec téléphone:     {phone_count}")
    print(f"   Enrichis (e/t):     {enriched_count}")
    print(f"{'=' * 60}")
    print(f"\n✅ Fichier: {Path(OUTPUT_FILE).absolute()}")


if __name__ == "__main__":
    main()
