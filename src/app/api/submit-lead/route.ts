import { NextRequest, NextResponse } from "next/server";

// ─────────────────────────────────────────────────────────────────────
// ViteUnDevis API v1.5 Integration — Ping Cascade + Lead Submission
// + Supabase backup + Email notification
// Doc: https://www.viteundevis.com/api/VUD-API-1.5.pdf
// ─────────────────────────────────────────────────────────────────────

const VUD_TOKEN = "17695301406978e31c715766978e31c715ae";
const VUD_PING_URL = "https://www.viteundevis.com/api/ping.php";

// API v1.5 endpoints (from official documentation)
// Test: https://www.viteundevis.com/api/get.php?test=1
// Production: https://www.viteundevis.com/api/get.php
const VUD_API_URL = "https://www.viteundevis.com/api/get.php";

// Supabase — stockage de tous les leads
const SUPABASE_URL = "https://nhmvgsrwhjsjnpncpiaj.supabase.co";
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

// PimpSEO — user_id pour le dashboard leads
const PIMPSEO_USER_ID = "cc2f54cd-0485-4c2e-ad03-9ec7f172f747";

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

        // Description détaillée du lead
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

        // ══════════════════════════════════════════════════════
        // ⚠️ ViteUnDevis DÉSACTIVÉ — en observation
        // Les leads sont collectés sur Supabase + PimpSEO uniquement
        // Pour réactiver, passer ENABLE_VUD=true dans .env.local
        // ══════════════════════════════════════════════════════
        const ENABLE_VUD = process.env.ENABLE_VUD === "true";

        let catId = "9";
        let catName = "Terrassement";
        let pingAccepted = false;
        let pingRecommended = false;
        let isSuccess = false;
        let devisId: string | null = null;
        let devisHash: string | null = null;
        let reversement: string | number | null = null;
        let vudResponse: VudApiResponse | null = null;
        let best: PingCandidate | null = null;

        if (ENABLE_VUD) {
            // ── PING CASCADE ──
            best = await findBestCategory(code_postal, pingDescription);
            catId = best?.catId || "9";
            catName = best?.catName || "Terrassement";
            pingAccepted = best?.ping.accept === 1;
            pingRecommended = best?.ping.recommande === 1;

            // ── CONSTRUIRE LE PAYLOAD API v1.5 ──
            const leadData: Record<string, string> = {
                key: VUD_TOKEN,
                cat_id: catId,
                nom: nomFamille,
                prenom: prenom,
                email: email,
                tel: telephone,
                mobile: telephone,
                adresse1: adresse || ville,
                cp: code_postal,
                ville: ville,
                cp_projet: code_postal,
                ville_projet: ville,
                pays: "fr",
                tp: profil === "professionnel" ? "2" : "1",
                type_bien: "2",
                delais: "1",
                situation: profil === "professionnel" ? "4" : "1",
                terrain: "0",
                permis: "3",
                description: leadDescription,
                format_return: "json",
                site_name: "prix-location-benne.fr",
            };

            if (profil === "professionnel" && entreprise) {
                leadData.societe = entreprise;
            }
            leadData.matin = "1";
            leadData.midi = "1";
            leadData.soir = "1";
            leadData.we = "0";

            // ── ENVOI DU LEAD ──
            vudResponse = await sendLeadToVUD(leadData);
            isSuccess = vudResponse?.code_retour?.[0]?.code?.toString() === "200";
            devisId = vudResponse?.devis_data?.devis_id?.toString() || null;
            devisHash = vudResponse?.devis_data?.devis_hash || null;
            reversement = vudResponse?.devis_data?.devis_reversement || null;

            if (!isSuccess && vudResponse?.code_retour) {
                console.error("VUD API errors:", vudResponse.code_retour);
            }
        } else {
            console.log("⏸️ ViteUnDevis désactivé — lead sauvegardé localement uniquement");
        }

        // ── SAUVEGARDE SUPABASE (toujours actif) ──
        const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "";
        const ua = request.headers.get("user-agent") || "";

        const saveResults = await Promise.allSettled([
            // 1. Table benne_leads (données complètes + marketplace)
            saveLeadToSupabase("benne_leads", {
                nom: nomFamille,
                prenom,
                email,
                telephone,
                adresse: adresse || "",
                ville,
                code_postal,
                departement: departement || "",
                profil,
                entreprise: entreprise || "",
                volume,
                type_dechet,
                date_livraison: date_livraison || "",
                date_retrait: date_retrait || "",
                message: message || "",
                vud_category: ENABLE_VUD ? catName : null,
                vud_category_id: ENABLE_VUD ? catId : null,
                vud_devis_id: devisId,
                vud_devis_hash: devisHash,
                vud_accepted: isSuccess,
                vud_cpl: ENABLE_VUD ? (Number(best?.ping.cpl) || 0) : 0,
                vud_ecpl: ENABLE_VUD ? (Number(best?.ping.ecpl) || 0) : 0,
                vud_errors: isSuccess ? null : vudResponse?.code_retour || null,
                ip_address: ip,
                user_agent: ua,
                // ✅ Rendre visible sur le marketplace pro
                marketplace_visible: true,
                is_sold: false,
            }),
            // 2. Table PimpSEO viteundevis_leads (visible dans le dashboard)
            saveLeadToSupabase("viteundevis_leads", {
                user_id: PIMPSEO_USER_ID,
                lead_id: devisId ? `#${devisId}` : `#benne-${Date.now()}`,
                lead_type: `Location de benne ${volume || ""}`.trim(),
                source_site: "prix-location-benne.fr",
                lead_date: new Date().toISOString(),
                buyer_type: ENABLE_VUD ? (pingAccepted ? "Standard" : (pingRecommended ? "Lowcost" : null)) : null,
                status: ENABLE_VUD ? (isSuccess ? "Attente" : "Refusé") : "Local",
                refusal_reason: isSuccess ? null : vudResponse?.code_retour?.map((e) => `${e.code}: ${e.code_texte}`).join(", ") || null,
                cpl: ENABLE_VUD ? (Number(best?.ping.cpl) || 0) : 0,
                is_resold: false,
                notes: `${type_dechet} — ${ville} (${code_postal}) — ${prenom} ${nomFamille} — ${telephone}`,
            }),
        ]);

        // Log any save failures
        saveResults.forEach((r, i) => {
            if (r.status === "rejected") {
                console.error(`Supabase save #${i} rejected:`, r.reason);
            }
        });

        // 🔔 Notifier les pros concernés — appel DIRECT Resend (pas de fire-and-forget)
        try {
            const RESEND_KEY = process.env.RESEND_API_KEY;
            // Le formulaire envoie le NOM du département (ex: "Rhône") mais les pros
            // ont des NUMÉROS (ex: "69"). On extrait le n° depuis le code postal.
            const deptCode = code_postal ? code_postal.substring(0, 2) : "";
            const deptLabel = departement || deptCode; // Pour l'affichage dans l'email
            if (RESEND_KEY && deptCode) {
                // Trouver les pros qui couvrent ce département (par numéro)
                const prosRes = await fetch(`${SUPABASE_URL}/rest/v1/pro_profiles?is_active=eq.true&departments=cs.{${deptCode}}&select=id,first_name,company_name`, {
                    headers: {
                        "apikey": SUPABASE_SERVICE_KEY,
                        "Authorization": `Bearer ${SUPABASE_SERVICE_KEY}`,
                    },
                });
                const pros = prosRes.ok ? await prosRes.json() : [];
                console.log(`[NOTIFY] Found ${pros.length} pros for dept ${deptCode} (${deptLabel})`);

                for (const pro of pros) {
                    // Récupérer l'email via Supabase Auth admin
                    const authRes = await fetch(`${SUPABASE_URL}/auth/v1/admin/users/${pro.id}`, {
                        headers: {
                            "apikey": SUPABASE_SERVICE_KEY,
                            "Authorization": `Bearer ${SUPABASE_SERVICE_KEY}`,
                        },
                    });
                    const authData = authRes.ok ? await authRes.json() : null;
                    const proEmail = authData?.email;
                    if (!proEmail) continue;

                    const proName = pro.first_name || pro.company_name || "Professionnel";
                    const emailRes = await fetch("https://api.resend.com/emails", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${RESEND_KEY}`,
                        },
                        body: JSON.stringify({
                            from: "Prix-Location-Benne.fr <notifications@prix-location-benne.fr>",
                            to: proEmail,
                            subject: `🟢 Nouveau lead disponible — ${ville} (${deptLabel})`,
                            html: `
<div style="max-width:520px;margin:40px auto;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0f172a;border-radius:16px;overflow:hidden;border:1px solid #1e293b">
  <div style="background:linear-gradient(135deg,#22c55e,#16a34a);padding:24px 32px;text-align:center">
    <div style="font-size:32px;margin-bottom:4px">🟢</div>
    <h1 style="color:white;font-size:20px;margin:0">Nouveau lead disponible !</h1>
  </div>
  <div style="padding:32px;color:#cbd5e1;font-size:15px;line-height:1.6">
    <p>Bonjour <strong style="color:white">${proName}</strong>,</p>
    <p>Un nouveau chantier correspondant à votre zone vient d'arriver :</p>
    <div style="background:#1e293b;border-radius:12px;padding:20px;margin:20px 0">
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="color:#64748b;padding:4px 0;font-size:13px">📍 Ville</td><td style="color:white;font-weight:bold;text-align:right">${ville} (${deptLabel})</td></tr>
        <tr><td style="color:#64748b;padding:4px 0;font-size:13px">🗑️ Type</td><td style="color:white;text-align:right">${type_dechet || "Déchets"}</td></tr>
        <tr><td style="color:#64748b;padding:4px 0;font-size:13px">📦 Volume</td><td style="color:white;text-align:right">${volume || "Non précisé"}</td></tr>
      </table>
    </div>
    <div style="text-align:center;margin:24px 0">
      <a href="https://www.prix-location-benne.fr/pro/marketplace" style="display:inline-block;background:linear-gradient(135deg,#f59e0b,#ea580c);color:#0f172a;padding:14px 32px;border-radius:12px;font-weight:bold;font-size:16px;text-decoration:none">🏪 Voir sur le Marketplace →</a>
    </div>
    <p style="font-size:13px;color:#64748b;text-align:center">Soyez le premier à saisir cette opportunité !</p>
  </div>
  <div style="border-top:1px solid #1e293b;padding:16px;text-align:center;font-size:12px;color:#475569">
    © 2026 Prix-Location-Benne.fr — Espace Professionnel
  </div>
</div>`,
                        }),
                    });
                    console.log(`[NOTIFY] Email to ${proEmail}: ${emailRes.status} ${emailRes.statusText}`);
                }
            } else {
                console.log("[NOTIFY] Skipped — no RESEND_API_KEY or no department");
            }
        } catch (notifyErr) {
            console.error("[NOTIFY] Error (non-blocking):", notifyErr);
        }

        return NextResponse.json({
            success: true,
            vud_enabled: ENABLE_VUD,
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

// ═══════════════════════════════════════════════════════════════
// SUPABASE — Sauvegarde dans benne_leads + viteundevis_leads
// ═══════════════════════════════════════════════════════════════

async function saveLeadToSupabase(table: string, lead: Record<string, unknown>) {
    if (!SUPABASE_SERVICE_KEY) {
        console.warn("SUPABASE_SERVICE_ROLE_KEY not set — lead not saved to DB");
        return;
    }

    try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                apikey: SUPABASE_SERVICE_KEY,
                Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
                Prefer: "return=minimal",
            },
            body: JSON.stringify(lead),
        });

        if (!res.ok) {
            const text = await res.text();
            console.error(`Supabase insert error (${table}):`, res.status, text);
        }
    } catch (err) {
        console.error(`Supabase save failed (${table}):`, err);
    }
}
