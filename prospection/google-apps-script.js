// ═══════════════════════════════════════════════════════════════════════
// 📧 PROSPECTION AUTOMATISÉE — Location de Benne
// Google Apps Script — À coller dans Extensions > Apps Script
// ═══════════════════════════════════════════════════════════════════════

// ─── CONFIGURATION ───────────────────────────────────────────────────
const CONFIG = {
  SHEET_NAME: "Prospects",        // Nom de l'onglet principal
  LOG_SHEET: "Journal",           // Onglet de log
  STATS_SHEET: "Stats",           // Onglet statistiques
  MAX_EMAILS_PER_DAY: 40,        // Limite quotidienne (rester sous 50)
  SENDER_NAME: "Timothy Wade",
  SENDER_TITLE: "Responsable Partenariats",
  SITE_URL: "https://www.prix-location-benne.fr",
  REPLY_TO: "wade.profession@gmail.com",
  DELAY_RELANCE_1: 4,            // Jours avant relance 1
  DELAY_RELANCE_2: 10,           // Jours avant relance 2
};

// ─── MENU PERSONNALISÉ ──────────────────────────────────────────────
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("🚛 Prospection Benne")
    .addItem("📧 Envoyer les mails du jour", "envoyerMailsDuJour")
    .addItem("🔄 Envoyer les relances", "envoyerRelances")
    .addSeparator()
    .addItem("📊 Mettre à jour les stats", "mettreAJourStats")
    .addItem("🏗️ Initialiser le Google Sheet", "initialiserSheet")
    .addToUi();
}

// ─── INITIALISER LA STRUCTURE DU SHEET ──────────────────────────────
function initialiserSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Onglet Prospects
  let sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_NAME);
  }

  const headers = [
    "Entreprise",          // A
    "Contact",             // B
    "Email",               // C
    "Téléphone",           // D
    "Département",         // E
    "Codes Postaux",       // F
    "Source",              // G (PagesJaunes, Google, LinkedIn...)
    "Statut",             // H (À contacter, Mail 1 envoyé, Relance 1, Relance 2, OK, Refusé)
    "Date Mail 1",        // I
    "Date Relance 1",     // J
    "Date Relance 2",     // K
    "Date Réponse",       // L
    "Notes",              // M
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length)
    .setBackground("#1e293b")
    .setFontColor("#ffffff")
    .setFontWeight("bold")
    .setFontSize(11);

  sheet.setFrozenRows(1);
  sheet.setColumnWidth(1, 200); // Entreprise
  sheet.setColumnWidth(2, 150); // Contact
  sheet.setColumnWidth(3, 250); // Email
  sheet.setColumnWidth(8, 140); // Statut

  // Validation Statut (colonne H)
  const statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList([
      "À contacter", "Mail 1 envoyé", "Relance 1 envoyée",
      "Relance 2 envoyée", "✅ OK", "❌ Refusé", "⏸️ Pas intéressé"
    ])
    .build();
  sheet.getRange("H2:H1000").setDataValidation(statusRule);

  // Mettre "À contacter" par défaut
  sheet.getRange("H2:H100").setValue("À contacter");

  // Onglet Journal
  let logSheet = ss.getSheetByName(CONFIG.LOG_SHEET);
  if (!logSheet) {
    logSheet = ss.insertSheet(CONFIG.LOG_SHEET);
    logSheet.getRange(1, 1, 1, 4).setValues([["Date", "Entreprise", "Email", "Type"]]);
    logSheet.getRange(1, 1, 1, 4).setBackground("#1e293b").setFontColor("#fff").setFontWeight("bold");
  }

  // Onglet Stats
  let statsSheet = ss.getSheetByName(CONFIG.STATS_SHEET);
  if (!statsSheet) {
    statsSheet = ss.insertSheet(CONFIG.STATS_SHEET);
  }

  SpreadsheetApp.getUi().alert("✅ Sheet initialisé avec succès !");
}

// ─── TEMPLATES DE MAILS ─────────────────────────────────────────────

function getMailTemplate1(departement, entreprise) {
  const prenom = entreprise ? entreprise : "là";
  return {
    subject: `Demandes de location de benne sur le ${departement} — partenaire recherché`,
    body: `Bonjour,

Je gère le portail prix-location-benne.fr, un site spécialisé qui reçoit chaque mois des dizaines de demandes de devis en location de benne et évacuation de gravats, venant de particuliers et de professionnels de toute la France.

Je n'effectue pas les prestations moi-même — je cherche un loueur sérieux sur le ${departement} pour lui transmettre ces chantiers en exclusivité.

Voici ce que contient chaque demande que je reçois :

✅ Nom complet + Téléphone + Email du prospect
✅ Adresse exacte du chantier
✅ Type de déchet (gravats, encombrants, déchets verts, DIB, mélange)
✅ Volume souhaité (3m³ à 30m³)
✅ Dates de livraison et de retrait souhaitées
✅ Profil : particulier ou professionnel (avec nom de société si pro)

→ En résumé : toutes les infos pour chiffrer un devis en 30 secondes.

Mon fonctionnement est simple :
• Pas d'abonnement, pas d'engagement
• Facturation au lead transmis (tarif fixé ensemble, entre 15 et 30€ HT)
• Envoi par email en temps réel dès qu'une demande tombe sur votre secteur

Pour vous permettre de juger de la qualité sans prendre le moindre risque, je vous offre les 3 prochaines demandes sur votre zone gratuitement.

Si vous êtes intéressé, répondez simplement "OK" à cet e-mail en me précisant les codes postaux (ou le département) sur lesquels vous pouvez intervenir.

Vous pouvez consulter le site ici : ${CONFIG.SITE_URL}

Cordialement,

${CONFIG.SENDER_NAME}
${CONFIG.SENDER_TITLE}
${CONFIG.SITE_URL}
${CONFIG.REPLY_TO}`
  };
}

function getMailRelance1(departement) {
  return {
    subject: `RE: Demandes de location de benne sur le ${departement}`,
    body: `Bonjour,

Je me permets de revenir vers vous suite à mon précédent message.

Depuis, j'ai reçu de nouvelles demandes de location de benne sur votre département (${departement}) que je n'ai pas pu transmettre faute de partenaire local.

Exemple type de demande reçue :

🏗️ Benne 10m³ — Gravats béton
📍 ${departement}
📅 Livraison souhaitée : semaine prochaine
👤 Particulier — Rénovation maison

Ces demandes expirent vite — les prospects contactent en moyenne 2 à 3 prestataires avant de signer.

L'offre tient toujours : 3 leads offerts, sans engagement. Un simple "OK" suffit.

Bonne journée,

${CONFIG.SENDER_NAME}
${CONFIG.SITE_URL}`
  };
}

function getMailRelance2(departement) {
  return {
    subject: `Des chantiers benne à vous envoyer sur le ${departement}`,
    body: `Bonjour,

Dernier message de ma part — je reçois régulièrement des demandes de location de benne (gravats, encombrants, DIB) sur votre secteur via prix-location-benne.fr.

Je cherche un loueur de confiance pour les transmettre. 3 premiers contacts offerts, aucun engagement.

Intéressé ? Répondez "OK" + vos codes postaux.

Cordialement,
${CONFIG.SENDER_NAME} — ${CONFIG.SITE_URL}`
  };
}

// ─── ENVOI DES MAILS DU JOUR (MAIL 1) ──────────────────────────────

function envoyerMailsDuJour() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  const logSheet = ss.getSheetByName(CONFIG.LOG_SHEET);

  if (!sheet) {
    SpreadsheetApp.getUi().alert("❌ Onglet '" + CONFIG.SHEET_NAME + "' introuvable. Lancez l'initialisation d'abord.");
    return;
  }

  const data = sheet.getDataRange().getValues();
  let envoyés = 0;
  const today = new Date();

  for (let i = 1; i < data.length && envoyés < CONFIG.MAX_EMAILS_PER_DAY; i++) {
    const entreprise = data[i][0];
    const email = data[i][2];
    const departement = data[i][4];
    const statut = data[i][7];

    if (!email || statut !== "À contacter") continue;

    try {
      const template = getMailTemplate1(departement, entreprise);

      GmailApp.sendEmail(email, template.subject, template.body, {
        name: CONFIG.SENDER_NAME,
        replyTo: CONFIG.REPLY_TO,
      });

      // Mise à jour du sheet
      sheet.getRange(i + 1, 8).setValue("Mail 1 envoyé");          // Statut
      sheet.getRange(i + 1, 9).setValue(today);                     // Date Mail 1
      sheet.getRange(i + 1, 8).setBackground("#fef3c7");           // Jaune clair

      // Log
      if (logSheet) {
        logSheet.appendRow([today, entreprise, email, "Mail 1"]);
      }

      envoyés++;
      Utilities.sleep(2000 + Math.random() * 3000); // 2-5s entre chaque mail

    } catch (e) {
      Logger.log("Erreur envoi à " + email + ": " + e.message);
      sheet.getRange(i + 1, 13).setValue("ERREUR: " + e.message); // Notes
    }
  }

  SpreadsheetApp.getUi().alert(`✅ ${envoyés} mails envoyés aujourd'hui.`);
}

// ─── ENVOI DES RELANCES AUTOMATIQUES ────────────────────────────────

function envoyerRelances() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  const logSheet = ss.getSheetByName(CONFIG.LOG_SHEET);

  if (!sheet) return;

  const data = sheet.getDataRange().getValues();
  let envoyés = 0;
  const today = new Date();

  for (let i = 1; i < data.length && envoyés < CONFIG.MAX_EMAILS_PER_DAY; i++) {
    const entreprise = data[i][0];
    const email = data[i][2];
    const departement = data[i][4];
    const statut = data[i][7];
    const dateMail1 = data[i][8];
    const dateRelance1 = data[i][9];

    if (!email) continue;

    const joursDepuisMail1 = dateMail1 ? Math.floor((today - new Date(dateMail1)) / 86400000) : 0;
    const joursDepuisRelance1 = dateRelance1 ? Math.floor((today - new Date(dateRelance1)) / 86400000) : 0;

    try {
      // Relance 1 : si Mail 1 envoyé il y a X jours
      if (statut === "Mail 1 envoyé" && joursDepuisMail1 >= CONFIG.DELAY_RELANCE_1) {
        const template = getMailRelance1(departement);
        GmailApp.sendEmail(email, template.subject, template.body, {
          name: CONFIG.SENDER_NAME,
          replyTo: CONFIG.REPLY_TO,
        });
        sheet.getRange(i + 1, 8).setValue("Relance 1 envoyée");
        sheet.getRange(i + 1, 10).setValue(today);
        sheet.getRange(i + 1, 8).setBackground("#fed7aa"); // Orange clair
        if (logSheet) logSheet.appendRow([today, entreprise, email, "Relance 1"]);
        envoyés++;
      }

      // Relance 2 : si Relance 1 envoyée il y a X jours
      if (statut === "Relance 1 envoyée" && joursDepuisRelance1 >= (CONFIG.DELAY_RELANCE_2 - CONFIG.DELAY_RELANCE_1)) {
        const template = getMailRelance2(departement);
        GmailApp.sendEmail(email, template.subject, template.body, {
          name: CONFIG.SENDER_NAME,
          replyTo: CONFIG.REPLY_TO,
        });
        sheet.getRange(i + 1, 8).setValue("Relance 2 envoyée");
        sheet.getRange(i + 1, 11).setValue(today);
        sheet.getRange(i + 1, 8).setBackground("#fecaca"); // Rouge clair
        if (logSheet) logSheet.appendRow([today, entreprise, email, "Relance 2"]);
        envoyés++;
      }

      if (envoyés > 0) Utilities.sleep(2000 + Math.random() * 3000);

    } catch (e) {
      Logger.log("Erreur relance à " + email + ": " + e.message);
    }
  }

  SpreadsheetApp.getUi().alert(`✅ ${envoyés} relances envoyées.`);
}

// ─── STATISTIQUES ───────────────────────────────────────────────────

function mettreAJourStats() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  let statsSheet = ss.getSheetByName(CONFIG.STATS_SHEET);

  if (!sheet || !statsSheet) return;

  const data = sheet.getDataRange().getValues();
  const stats = {
    total: 0,
    aContacter: 0,
    mail1: 0,
    relance1: 0,
    relance2: 0,
    ok: 0,
    refuse: 0,
  };

  for (let i = 1; i < data.length; i++) {
    if (!data[i][2]) continue; // pas d'email = pas un prospect
    stats.total++;
    const s = data[i][7];
    if (s === "À contacter") stats.aContacter++;
    else if (s === "Mail 1 envoyé") stats.mail1++;
    else if (s === "Relance 1 envoyée") stats.relance1++;
    else if (s === "Relance 2 envoyée") stats.relance2++;
    else if (s === "✅ OK") stats.ok++;
    else if (s === "❌ Refusé" || s === "⏸️ Pas intéressé") stats.refuse++;
  }

  const tauxReponse = stats.total > 0
    ? ((stats.ok / (stats.total - stats.aContacter)) * 100).toFixed(1)
    : "0";

  statsSheet.clear();
  const rows = [
    ["📊 STATISTIQUES PROSPECTION", ""],
    ["", ""],
    ["Total prospects", stats.total],
    ["À contacter", stats.aContacter],
    ["Mail 1 envoyé", stats.mail1],
    ["Relance 1 envoyée", stats.relance1],
    ["Relance 2 envoyée", stats.relance2],
    ["✅ Partenaires OK", stats.ok],
    ["❌ Refusés", stats.refuse],
    ["", ""],
    ["Taux de conversion", tauxReponse + "%"],
  ];

  statsSheet.getRange(1, 1, rows.length, 2).setValues(rows);
  statsSheet.getRange(1, 1).setFontSize(16).setFontWeight("bold");
  statsSheet.getRange(8, 1, 1, 2).setBackground("#dcfce7").setFontWeight("bold");
  statsSheet.setColumnWidth(1, 250);
  statsSheet.setColumnWidth(2, 100);

  SpreadsheetApp.getUi().alert("📊 Stats mises à jour !");
}

// ─── TRIGGER AUTOMATIQUE (optionnel) ────────────────────────────────
// Pour automatiser : Déclencheurs > Ajouter > envoyerRelances > Quotidien

function creerTriggerQuotidien() {
  // Supprime les anciens triggers
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(t => ScriptApp.deleteTrigger(t));

  // Relances automatiques chaque jour à 9h
  ScriptApp.newTrigger("envoyerRelances")
    .timeBased()
    .everyDays(1)
    .atHour(9)
    .create();

  SpreadsheetApp.getUi().alert("⏰ Trigger quotidien créé (relances à 9h).");
}
