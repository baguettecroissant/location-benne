import { NextRequest, NextResponse } from "next/server";

// ─────────────────────────────────────────────────────────────────────
// ViteUnDevis API v1.5 Integration — Ping Cascade + Lead Submission
// Doc: https://www.viteundevis.com/api/VUD-API-1.5.pdf
// ─────────────────────────────────────────────────────────────────────

const VUD_TOKEN = "17695301406978e31c715766978e31c715ae";
const VUD_PING_URL = "https://www.viteundevis.com/api/ping.php";

// API v1.5 endpoints (from official documentation)
// Test: https://www.viteundevis.com/api/get.php?test=1
// Production: https://www.viteundevis.com/api/get.php
const VUD_API_URL = "https://www.viteundevis.com/api/get.php";

// Catégories candidates pour "Location de benne / Évacuation de gravats"
// Ordre de priorité par pertinence métier
const CANDIDATE_CATEGORIES = [
    { id: "123", name: "Démolition" },
    { id: "9", name: "Terrassement" },
    { id: "7", name: "Maçonnerie" },
];

interface PingResult {
    accept: number;
    recommande: number;
    buyers: number;
    cpl: string | number;
    ecpl: string | number;
    error: number;
    text: string;
}

interface PingCandidate {
    catId: string;
    catName: string;
    ping: PingResult;
}

interface VudCodeRetour {
    code: string | number;
    code_texte: string;
}

interface VudApiResponse {
    code_retour: VudCodeRetour[];
    devis_data?: {
        devis_id: string | number;
        devis_reversement: string | number;
        devis_hash: string;
        devis_montant_attention?: string;
    };
}

// ─────────────────────────────────────────────
// Ping ViteUnDevis pour une catégorie donnée
// ─────────────────────────────────────────────
async function pingVUD(
    catId: string,
    codePostal: string,
    description: string
): Promise<PingResult> {
    try {
        const res = await fetch(VUD_PING_URL, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                token: VUD_TOKEN,
                cat_id: catId,
                code_postal: codePostal,
                pays: "fr",
                cpl_mini: "0",
                description,
            }),
        });
        return (await res.json()) as PingResult;
    } catch {
        return {
            accept: 0, recommande: 0, buyers: 0,
            cpl: "0", ecpl: "0", error: 1, text: "Ping failed",
        };
    }
}

// ─────────────────────────────────────────────
// Ping cascade : teste toutes les catégories
// et retourne la meilleure option
// ─────────────────────────────────────────────
async function findBestCategory(
    codePostal: string,
    description: string
): Promise<PingCandidate | null> {
    const results = await Promise.all(
        CANDIDATE_CATEGORIES.map(async (cat) => {
            const ping = await pingVUD(cat.id, codePostal, description);
            return { catId: cat.id, catName: cat.name, ping };
        })
    );

    // 1. Meilleure catégorie avec accept=1 (par eCPL décroissant)
    const accepted = results
        .filter((r) => r.ping.accept === 1)
        .sort((a, b) => Number(b.ping.ecpl) - Number(a.ping.ecpl));
    if (accepted.length > 0) return accepted[0];

    // 2. Fallback : catégorie recommandée (par eCPL décroissant)
    const recommended = results
        .filter((r) => r.ping.recommande === 1)
        .sort((a, b) => Number(b.ping.ecpl) - Number(a.ping.ecpl));
    if (recommended.length > 0) return recommended[0];

    // 3. Dernier recours : Terrassement (meilleure couverture générale)
    return results.find((r) => r.catId === "9") || results[0];
}

// ─────────────────────────────────────────────
// Envoie le lead à ViteUnDevis via API v1.5
// Endpoint: POST https://www.viteundevis.com/api/get.php
// ─────────────────────────────────────────────
async function sendLeadToVUD(
    data: Record<string, string>,
    testMode = false
): Promise<VudApiResponse | null> {
    try {
        const url = testMode ? `${VUD_API_URL}?test=1` : VUD_API_URL;
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "User-Agent": `partenaire-apivud-${VUD_TOKEN}`,
            },
            body: new URLSearchParams(data),
        });

        const raw = await res.text();

        // API v1.5 supports json or serialize format
        // We request json format via format_return param
        try {
            return JSON.parse(raw) as VudApiResponse;
        } catch {
            // Fallback: try to parse PHP serialize format
            // Simple extraction of key values from serialize format
            console.log("VUD raw response:", raw);
            const devisIdMatch = raw.match(/devis_id[^}]*?"(\d+)"/);
            const devisHashMatch = raw.match(/devis_hash[^}]*?"([a-f0-9]+)"/);
            const codeMatch = raw.match(/code[^}]*?"(\d+)"/);

            return {
                code_retour: [{
                    code: codeMatch?.[1] || "0",
                    code_texte: "parsed from serialize",
                }],
                devis_data: devisIdMatch ? {
                    devis_id: devisIdMatch[1],
                    devis_reversement: "0",
                    devis_hash: devisHashMatch?.[1] || "",
                } : undefined,
            };
        }
    } catch (err) {
        console.error("VUD API send error:", err);
        return null;
    }
}

// ─────────────────────────────────────────────
// Construit une description riche pour
// optimiser le matching ViteUnDevis
// ─────────────────────────────────────────────
function buildDescription(formData: {
    volume: string;
    type_dechet: string;
    profil: string;
    ville: string;
    message?: string;
}): string {
    const wasteLabels: Record<string, string> = {
        gravats: "gravats béton briques tuiles parpaings",
        "dechets-verts": "déchets verts branches tontes végétaux",
        encombrants: "encombrants meubles matelas débarras",
        dib: "DIB déchets industriels bois métal plastique",
        mixte: "déchets mélangés tout-venant",
    };

    const parts = [
        `Location de benne ${formData.volume}`,
        `pour évacuation de ${wasteLabels[formData.type_dechet] || "déchets de chantier"}`,
        `chantier ${formData.profil === "professionnel" ? "professionnel" : "particulier"}`,
        `à ${formData.ville}`,
        "terrassement démolition évacuation gravats déblais chantier rénovation",
    ];

    if (formData.message) parts.push(formData.message);

    return parts.join(". ");
}

// ═══════════════════════════════════════════════════════════════
// POST /api/submit-lead
// ═══════════════════════════════════════════════════════════════

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const {
            nom,
            telephone,
            email,
            profil,
            volume,
            type_dechet,
            ville,
            code_postal,
            departement,
            message,
            date_livraison,
            date_retrait,
            entreprise,
            adresse,
        } = body;

        // ── VALIDATION ──
        if (!nom || !telephone || !email || !code_postal || !ville) {
            return NextResponse.json(
                { success: false, error: "Champs obligatoires manquants (nom, tel, email, cp, ville)" },
                { status: 400 }
            );
        }

        // Séparer nom / prénom (approximation)
        const nameParts = (nom as string).trim().split(/\s+/);
        const prenom = nameParts[0] || "";
        const nomFamille = nameParts.slice(1).join(" ") || nameParts[0] || "";

        // Construire la description riche pour le ping
        const pingDescription = buildDescription({
            volume, type_dechet, profil, ville, message,
        });

        // ── PING CASCADE ──
        const best = await findBestCategory(code_postal, pingDescription);
        const catId = best?.catId || "9";
        const catName = best?.catName || "Terrassement";
        const pingAccepted = best?.ping.accept === 1;
        const pingRecommended = best?.ping.recommande === 1;

        // ── CONSTRUIRE LA DESCRIPTION DU LEAD ──
        // (ce champ est très important selon la doc VUD)
        const leadDescription = [
            `Location de benne ${volume} — ${type_dechet}`,
            `Profil: ${profil}${entreprise ? ` (${entreprise})` : ""}`,
            `Lieu: ${ville} (${code_postal}) — ${departement}`,
            date_livraison ? `Livraison souhaitée: ${date_livraison}` : "",
            date_retrait ? `Retrait souhaité: ${date_retrait}` : "",
            message ? `Précisions: ${message}` : "",
        ]
            .filter(Boolean)
            .join("\n");

        // ── CONSTRUIRE LE PAYLOAD API v1.5 ──
        // Champs conformes à la doc VUD-API-1.5.pdf
        const leadData: Record<string, string> = {
            // Authentication
            key: VUD_TOKEN,

            // Catégorie
            cat_id: catId,

            // Identité du dépositaire
            nom: nomFamille,
            prenom: prenom,
            email: email,
            tel: telephone,         // "tel" (pas "telephone") — doc v1.5
            mobile: telephone,      // On met le même numéro en mobile aussi

            // Adresse du dépositaire (obligatoire selon doc v1.5)
            adresse1: adresse || ville,  // Fallback ville si pas d'adresse
            cp: code_postal,
            ville: ville,

            // Lieu du projet (obligatoire selon doc v1.5)
            cp_projet: code_postal,
            ville_projet: ville,

            // Pays (ISO 3166-1 alpha-2)
            pays: "fr",

            // Type de personne: 1=Particulier, 2=Pro, 3=Syndicat, 4=Autre
            tp: profil === "professionnel" ? "2" : "1",

            // Type de bien: 1=Appart, 2=Maison, 3=Immeuble, 4=Bureau
            type_bien: "2",  // Maison par défaut (le plus courant pour location benne)

            // Délais: 1=Urgent, 2=6mois, 3=1an, 4=+1an
            delais: "1",  // Location de benne = toujours urgent

            // Situation: 1=Propriétaire, 2=Locataire, 3=Admin, 4=Autre
            situation: profil === "professionnel" ? "4" : "1",

            // Terrain & Permis (pas applicable pour location benne)
            terrain: "0",
            permis: "3",  // 3 = Non (par défaut)

            // Description (champ très important selon la doc)
            description: leadDescription,

            // Format de retour
            format_return: "json",

            // Nom du site source
            site_name: "prix-location-benne.fr",
        };

        // Société si professionnel
        if (profil === "professionnel" && entreprise) {
            leadData.societe = entreprise;
        }

        // Disponibilités de contact
        leadData.matin = "1";
        leadData.midi = "1";
        leadData.soir = "1";
        leadData.we = "0";

        // ── ENVOI DU LEAD ──
        const vudResponse = await sendLeadToVUD(leadData);

        // Vérifier la réponse VUD
        const isSuccess = vudResponse?.code_retour?.[0]?.code?.toString() === "200";
        const devisId = vudResponse?.devis_data?.devis_id?.toString() || null;
        const devisHash = vudResponse?.devis_data?.devis_hash || null;
        const reversement = vudResponse?.devis_data?.devis_reversement || null;

        if (!isSuccess && vudResponse?.code_retour) {
            console.error("VUD API errors:", vudResponse.code_retour);
        }

        return NextResponse.json({
            success: true,
            vud_accepted: isSuccess,
            ping_accepted: pingAccepted,
            ping_recommended: pingRecommended,
            category: catName,
            categoryId: catId,
            cpl: best?.ping.cpl || "0",
            ecpl: best?.ping.ecpl || "0",
            devis_id: devisId,
            devis_hash: devisHash,
            reversement: reversement,
            vud_errors: isSuccess ? null : vudResponse?.code_retour || null,
        });
    } catch (error) {
        console.error("submit-lead error:", error);
        return NextResponse.json(
            { success: false, error: "Erreur serveur" },
            { status: 500 }
        );
    }
}
