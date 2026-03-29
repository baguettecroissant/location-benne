"use client";

import { useState, FormEvent } from "react";
import { Truck, CheckCircle, Clock, Shield, ArrowRight, ArrowLeft, Loader2, Send, User, Building2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CityAutocomplete } from "@/components/forms/CityAutocomplete";

interface SelectedCity {
    name: string;
    zip: string;
    department_name: string;
    department_code: string;
}

type ProfileType = "particulier" | "professionnel";
type FormStatus = "idle" | "submitting" | "success" | "error";

export default function DevisPage() {
    const [step, setStep] = useState(1);
    const [profile, setProfile] = useState<ProfileType>("particulier");
    const [selectedVolume, setSelectedVolume] = useState("");
    const [wasteType, setWasteType] = useState("");
    const [formStatus, setFormStatus] = useState<FormStatus>("idle");
    const [selectedCity, setSelectedCity] = useState<SelectedCity | null>(null);

    function handleNextStep() {
        if (!selectedCity) {
            alert("Veuillez sélectionner un lieu de livraison.");
            return;
        }
        if (!wasteType || !selectedVolume) {
            alert("Veuillez sélectionner un type de déchet et un volume.");
            return;
        }
        setStep(2);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setFormStatus("submitting");

        const formData = new FormData(e.currentTarget);
        formData.set("profil", profile);
        formData.set("volume", selectedVolume);
        formData.set("type_dechet", wasteType);

        try {
            const res = await fetch("https://formspree.io/f/xlgpqqgr", {
                method: "POST",
                body: formData,
                headers: { Accept: "application/json" },
            });
            setFormStatus(res.ok ? "success" : "error");
        } catch {
            setFormStatus("error");
        }
    }

    if (formStatus === "success") {
        return (
            <div className="bg-slate-50 min-h-screen py-16">
                <div className="container mx-auto px-4 max-w-2xl text-center">
                    <div className="bg-white rounded-3xl shadow-lg border border-green-200 p-12">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="h-10 w-10 text-green-600" />
                        </div>
                        <h1 className="text-3xl font-black text-slate-900 mb-4">Demande envoyée !</h1>
                        <p className="text-lg text-slate-600 mb-8">
                            Votre demande de devis a bien été transmise. Nous vous recontactons sous 2h avec les tarifs des loueurs de votre zone.
                        </p>
                        <div className="space-y-4">
                            <Link href="/"><Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-6 rounded-xl">Retour à l&apos;accueil</Button></Link>
                            <p className="text-sm text-slate-400">En attendant, consultez nos <Link href="/guides" className="text-amber-600 font-semibold hover:underline">guides pratiques</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* HERO */}
            <section className="relative text-white py-12 overflow-hidden">
                <Image src="/images/hero-homepage.png" alt="Demande de devis location benne" fill className="object-cover" priority />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/85 to-slate-900/95"></div>
                <div className="container mx-auto px-4 max-w-4xl relative z-10 text-center">
                    <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">
                        Votre devis <span className="text-amber-400">location de benne</span>
                    </h1>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                        Décrivez votre projet en 2 minutes. <strong className="text-white">100% gratuit, sans engagement.</strong>
                    </p>

                    {/* STEP INDICATOR */}
                    <div className="mt-6 flex items-center justify-center gap-3">
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all ${step === 1 ? "bg-amber-500 text-white" : "bg-white/20 text-white/60"}`}>
                            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">{step > 1 ? "✓" : "1"}</span>
                            Votre projet
                        </div>
                        <div className="w-8 h-0.5 bg-white/20"></div>
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all ${step === 2 ? "bg-amber-500 text-white" : "bg-white/20 text-white/60"}`}>
                            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">2</span>
                            Vos coordonnées
                        </div>
                    </div>
                </div>
            </section>

            {/* TRUST BAR */}
            <section className="bg-slate-800 py-3 border-b border-slate-700">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-3 gap-3 text-slate-200 text-xs font-semibold text-center">
                        <div className="flex items-center justify-center gap-1"><CheckCircle className="h-3.5 w-3.5 text-green-400" /> Gratuit</div>
                        <div className="flex items-center justify-center gap-1"><Clock className="h-3.5 w-3.5 text-amber-400" /> Réponse 2h</div>
                        <div className="flex items-center justify-center gap-1"><Shield className="h-3.5 w-3.5 text-blue-400" /> Certifiés</div>
                    </div>
                </div>
            </section>

            {/* FORM + SIDEBAR */}
            <section className="py-10">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="grid lg:grid-cols-3 gap-10 items-start">

                        {/* FORM */}
                        <div className="lg:col-span-2">
                            <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden">
                                <div className="p-6 md:p-8">

                                    {/* Hidden fields for city data — always present in the form DOM */}
                                    <input type="hidden" name="lieu_livraison" value={selectedCity ? `${selectedCity.name} (${selectedCity.zip}) — ${selectedCity.department_name}` : ""} />
                                    <input type="hidden" name="ville" value={selectedCity?.name || ""} />
                                    <input type="hidden" name="code_postal" value={selectedCity?.zip || ""} />
                                    <input type="hidden" name="departement" value={selectedCity?.department_name || ""} />

                                    {/* ═══════════ STEP 1: VOTRE PROJET ═══════════ */}
                                    {step === 1 && (
                                        <div className="space-y-6">
                                            {/* PROFIL */}
                                            <div>
                                                <label className="block text-sm font-semibold text-slate-700 mb-3">Vous êtes</label>
                                                <div className="grid grid-cols-2 gap-3">
                                                    <button
                                                        type="button"
                                                        onClick={() => setProfile("particulier")}
                                                        className={`flex items-center justify-center gap-2 p-3.5 border-2 rounded-xl font-bold transition-all text-sm ${
                                                            profile === "particulier"
                                                                ? "border-amber-500 bg-amber-50 text-amber-700"
                                                                : "border-slate-200 text-slate-600 hover:border-slate-300"
                                                        }`}
                                                    >
                                                        <User className="h-4 w-4" /> Particulier
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setProfile("professionnel")}
                                                        className={`flex items-center justify-center gap-2 p-3.5 border-2 rounded-xl font-bold transition-all text-sm ${
                                                            profile === "professionnel"
                                                                ? "border-amber-500 bg-amber-50 text-amber-700"
                                                                : "border-slate-200 text-slate-600 hover:border-slate-300"
                                                        }`}
                                                    >
                                                        <Building2 className="h-4 w-4" /> Professionnel
                                                    </button>
                                                </div>
                                            </div>

                                            {/* LOCALISATION */}
                                            <div>
                                                <label className="block text-sm font-semibold text-slate-700 mb-3">Lieu de livraison *</label>
                                                <CityAutocomplete onSelect={(city) => setSelectedCity(city)} />
                                            </div>

                                            {/* TYPE DE DÉCHET */}
                                            <div>
                                                <label className="block text-sm font-semibold text-slate-700 mb-3">Type de déchet *</label>
                                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                                    {[
                                                        { val: "gravats", label: "Gravats", icon: "🪨", sub: "Béton, briques, tuiles" },
                                                        { val: "encombrants", label: "Encombrants", icon: "📦", sub: "Meubles, matelas" },
                                                        { val: "dechets-verts", label: "Déchets verts", icon: "🌿", sub: "Tontes, branches" },
                                                        { val: "dib", label: "DIB", icon: "🏭", sub: "Bois, métal, plastique" },
                                                        { val: "mixte", label: "Mélange", icon: "🔀", sub: "Tout-venant" },
                                                    ].map((t) => (
                                                        <button
                                                            key={t.val}
                                                            type="button"
                                                            onClick={() => setWasteType(t.val)}
                                                            className={`p-3 border-2 rounded-xl text-left transition-all ${
                                                                wasteType === t.val
                                                                    ? "border-amber-500 bg-amber-50"
                                                                    : "border-slate-200 hover:border-slate-300"
                                                            }`}
                                                        >
                                                            <div className="text-lg">{t.icon}</div>
                                                            <div className="font-bold text-sm text-slate-900">{t.label}</div>
                                                            <div className="text-xs text-slate-400">{t.sub}</div>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* VOLUME */}
                                            <div>
                                                <label className="block text-sm font-semibold text-slate-700 mb-3">Volume estimé *</label>
                                                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                                                    {["3m³", "6m³", "10m³", "15m³", "20m³", "30m³"].map((v) => (
                                                        <button
                                                            key={v}
                                                            type="button"
                                                            onClick={() => setSelectedVolume(v)}
                                                            className={`border-2 rounded-xl p-3 text-center font-bold text-sm transition-all ${
                                                                selectedVolume === v
                                                                    ? "bg-amber-500 text-white border-amber-500"
                                                                    : "border-slate-200 text-slate-700 hover:border-amber-300"
                                                            }`}
                                                        >
                                                            {v}
                                                        </button>
                                                    ))}
                                                </div>
                                                <p className="text-xs text-slate-400 mt-2">Pas sûr ? <Link href="/guides/comment-choisir-taille-benne" className="text-amber-600 hover:underline font-medium">Guide des tailles</Link></p>
                                            </div>

                                            {/* NEXT BUTTON */}
                                            <Button
                                                type="button"
                                                size="lg"
                                                onClick={handleNextStep}
                                                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold text-lg py-6 rounded-xl shadow-lg"
                                            >
                                                Étape suivante <ArrowRight className="ml-2 h-5 w-5" />
                                            </Button>
                                        </div>
                                    )}

                                    {/* ═══════════ STEP 2: VOS COORDONNÉES ═══════════ */}
                                    {step === 2 && (
                                        <div className="space-y-6">
                                            {/* RÉCAPITULATIF */}
                                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center justify-between">
                                                <div className="text-sm">
                                                    <span className="font-bold text-slate-900">{profile === "professionnel" ? "Pro" : "Particulier"}</span>
                                                    <span className="text-slate-400 mx-2">•</span>
                                                    <span className="text-slate-600">{selectedCity ? `${selectedCity.name} (${selectedCity.zip})` : "—"}</span>
                                                    <span className="text-slate-400 mx-2">•</span>
                                                    <span className="text-slate-600">{wasteType || "—"}</span>
                                                    <span className="text-slate-400 mx-2">•</span>
                                                    <span className="font-bold text-amber-600">{selectedVolume}</span>
                                                </div>
                                                <button type="button" onClick={() => setStep(1)} className="text-amber-600 hover:text-amber-700 text-sm font-semibold flex items-center gap-1">
                                                    <ArrowLeft className="h-3 w-3" /> Modifier
                                                </button>
                                            </div>

                                            {/* DATES */}
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Date de livraison souhaitée</label>
                                                    <input
                                                        type="date"
                                                        name="date_livraison"
                                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Date de retrait souhaitée</label>
                                                    <input
                                                        type="date"
                                                        name="date_retrait"
                                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                                                    />
                                                </div>
                                            </div>

                                            {/* NOM + TEL */}
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Nom complet *</label>
                                                    <input type="text" name="nom" required placeholder="Jean Dupont" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Téléphone *</label>
                                                    <input type="tel" name="telephone" required placeholder="06 12 34 56 78" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all" />
                                                </div>
                                            </div>

                                            {/* EMAIL */}
                                            <div>
                                                <label className="block text-sm font-semibold text-slate-700 mb-2">Email *</label>
                                                <input type="email" name="email" required placeholder="jean.dupont@email.com" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all" />
                                            </div>

                                            {/* ENTREPRISE (pro only) */}
                                            {profile === "professionnel" && (
                                                <div>
                                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Entreprise</label>
                                                    <input type="text" name="entreprise" placeholder="Nom de votre société" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all" />
                                                </div>
                                            )}

                                            {/* MESSAGE */}
                                            <div>
                                                <label className="block text-sm font-semibold text-slate-700 mb-2">Message / Précisions</label>
                                                <textarea name="message" rows={3} placeholder="Accès au chantier, contraintes, précisions..." className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all resize-none" />
                                            </div>

                                            {/* BUTTONS */}
                                            <div className="flex gap-3">
                                                <Button type="button" size="lg" variant="outline" onClick={() => setStep(1)} className="px-6 py-6 rounded-xl font-bold border-slate-300">
                                                    <ArrowLeft className="mr-2 h-5 w-5" /> Retour
                                                </Button>
                                                <Button
                                                    type="submit"
                                                    size="lg"
                                                    disabled={formStatus === "submitting"}
                                                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-bold text-lg py-6 rounded-xl shadow-lg disabled:opacity-60"
                                                >
                                                    {formStatus === "submitting" ? (
                                                        <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Envoi...</>
                                                    ) : (
                                                        <><Send className="mr-2 h-5 w-5" /> Envoyer ma demande</>
                                                    )}
                                                </Button>
                                            </div>

                                            {formStatus === "error" && (
                                                <p className="text-red-600 text-center text-sm font-medium">
                                                    Une erreur est survenue. Veuillez réessayer.
                                                </p>
                                            )}
                                        </div>
                                    )}

                                </div>

                                <div className="bg-amber-50 px-6 py-3 border-t border-amber-100 text-xs text-amber-800 text-center flex items-center justify-center gap-2">
                                    <Shield className="w-3.5 h-3.5" /> Vos données restent confidentielles.
                                </div>
                            </form>
                        </div>

                        {/* SIDEBAR */}
                        <div className="space-y-6">
                            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
                                <h3 className="font-extrabold text-slate-900 mb-5 text-lg">Nos garanties</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <div className="bg-amber-100 p-1.5 rounded-lg shrink-0"><CheckCircle className="h-5 w-5 text-amber-600" /></div>
                                        <div><strong className="block text-slate-900 text-sm">100% Gratuit</strong><span className="text-xs text-slate-500">Sans engagement.</span></div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="bg-green-100 p-1.5 rounded-lg shrink-0"><Clock className="h-5 w-5 text-green-600" /></div>
                                        <div><strong className="block text-slate-900 text-sm">Réponse sous 2h</strong><span className="text-xs text-slate-500">Tarifs rapides.</span></div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="bg-blue-100 p-1.5 rounded-lg shrink-0"><Shield className="h-5 w-5 text-blue-600" /></div>
                                        <div><strong className="block text-slate-900 text-sm">Loueurs Certifiés</strong><span className="text-xs text-slate-500">Agréés et assurés.</span></div>
                                    </li>
                                </ul>
                            </div>

                            <div className="relative overflow-hidden bg-slate-900 p-6 rounded-3xl text-center shadow-lg">
                                <div className="absolute top-0 right-0 opacity-10"><Truck className="w-24 h-24 text-white" /></div>
                                <div className="relative z-10">
                                    <div className="text-4xl font-black text-amber-400 mb-1">24h</div>
                                    <div className="text-slate-300 font-medium text-sm">Délai moyen de livraison</div>
                                </div>
                            </div>

                            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                                <h3 className="font-bold text-slate-900 mb-2 text-sm">📚 Besoin d&apos;aide ?</h3>
                                <ul className="space-y-1.5 text-sm">
                                    <li><Link href="/guides/comment-choisir-taille-benne" className="text-amber-600 hover:underline font-medium">→ Quelle taille choisir ?</Link></li>
                                    <li><Link href="/guides/prix-location-benne-guide-complet" className="text-amber-600 hover:underline font-medium">→ Guide des prix 2026</Link></li>
                                    <li><Link href="/tarifs" className="text-amber-600 hover:underline font-medium">→ Grille tarifaire</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
