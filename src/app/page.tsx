import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Shield, Truck, MapPin, Euro, Clock, Recycle, Package, TreePine, Hammer, Factory, Phone, BookOpen, Users, Award, Leaf } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Metadata } from "next";
import { guides, guidesCategories } from "@/lib/guides-data";

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.prix-location-benne.fr',
  },
};

const tarifs = [
  { volume: "3m³", prix: "149", desc: "Petit chantier, salle de bain", icon: Package, color: "amber" },
  { volume: "10m³", prix: "299", desc: "Rénovation pièce, toiture", icon: Hammer, color: "amber" },
  { volume: "20m³", prix: "449", desc: "Gros chantier, débarras maison", icon: Truck, color: "amber" },
  { volume: "30m³", prix: "599", desc: "Chantier BTP, démolition", icon: Factory, color: "amber" },
];

const typesDechet = [
  { nom: "Gravats", desc: "Béton, briques, tuiles, carrelage, pierres", href: "/location-benne-gravats", icon: Hammer, color: "bg-orange-100 text-orange-600" },
  { nom: "Encombrants", desc: "Meubles, électroménagers, matelas, objets volumineux", href: "/location-benne-encombrants", icon: Package, color: "bg-blue-100 text-blue-600" },
  { nom: "Déchets Verts", desc: "Tontes, feuilles, branchages, tailles de haies", href: "/location-benne-dechets-verts", icon: TreePine, color: "bg-green-100 text-green-600" },
  { nom: "DIB", desc: "Bois, métal, plastique, carton, déchets non dangereux", href: "/location-benne-dib", icon: Factory, color: "bg-purple-100 text-purple-600" },
];

const etapes = [
  { num: "01", titre: "Décrivez votre projet", desc: "Indiquez votre ville, le type de déchet et le volume souhaité." },
  { num: "02", titre: "Recevez votre devis", desc: "Comparez les tarifs des loueurs certifiés de votre zone en quelques minutes." },
  { num: "03", titre: "Livraison de la benne", desc: "La benne est livrée directement sur votre chantier sous 24 à 48h." },
  { num: "04", titre: "Enlèvement & traitement", desc: "Une fois remplie, la benne est enlevée et les déchets traités en centre agréé." },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 flex items-center overflow-hidden">
        <Image src="/images/hero-homepage.png" alt="Chantier de location de bennes en France" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/50"></div>

        <div className="container mx-auto px-4 relative z-10 flex flex-col items-start text-left lg:w-3/5">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-5 py-2 rounded-lg text-sm font-semibold tracking-wide mb-8">
            <Truck className="h-4 w-4 text-amber-400" />
            <span>Comparez les prix 2026 — Toute la France</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-[1.1]">
            Location de benne<br />
            <span className="text-amber-400">au meilleur prix.</span>
          </h1>

          <p className="text-xl text-slate-300 mb-10 max-w-2xl font-light">
            Comparez gratuitement les tarifs de location de bennes dans votre ville. Gravats, encombrants, déchets verts — livraison sous 24h partout en France.
          </p>

          <div className="flex w-full sm:w-auto">
            <Link href="/devis" className="w-full sm:w-auto">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-lg px-8 py-7 rounded-xl shadow-xl w-full">
                Obtenir un devis gratuit
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </Link>
          </div>

          <div className="mt-10 flex items-center gap-2 text-slate-400 text-sm">
            <Shield className="h-5 w-5" />
            <span>Service 100% gratuit — Sans engagement — Loueurs certifiés</span>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-slate-800 border-b border-slate-700 py-5 shadow-inner">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-slate-200 text-xs md:text-sm font-semibold text-center">
            <div className="flex flex-col items-center gap-1 justify-center"><Euro className="h-6 w-6 text-amber-400 mb-1" /> Devis 100% Gratuit</div>
            <div className="flex flex-col items-center gap-1 justify-center"><Clock className="h-6 w-6 text-amber-400 mb-1" /> Livraison 24-48h</div>
            <div className="flex flex-col items-center gap-1 justify-center"><Recycle className="h-6 w-6 text-amber-400 mb-1" /> Traitement Conforme</div>
            <div className="flex flex-col items-center gap-1 justify-center"><MapPin className="h-6 w-6 text-amber-400 mb-1" /> Toute la France</div>
          </div>
        </div>
      </section>

      {/* Tarifs Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-600 font-bold tracking-wider uppercase text-sm">Tarifs indicatifs 2026</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-3 mb-6">
              Quel prix pour votre benne ?
            </h2>
            <p className="text-lg text-slate-600">
              Les tarifs varient selon le volume, le type de déchet et votre localisation. Voici les fourchettes de prix constatées en France.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {tarifs.map((t) => (
              <div key={t.volume} className="bg-white border-2 border-slate-100 rounded-2xl p-8 hover:border-amber-400 hover:shadow-xl transition-all group text-center">
                <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-100 transition-colors">
                  <t.icon className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Benne {t.volume}</h3>
                <div className="text-4xl font-black text-amber-600 mb-2">
                  {t.prix}€<span className="text-sm font-normal text-slate-400"> TTC</span>
                </div>
                <p className="text-sm text-slate-500 mb-6">{t.desc}</p>
                <Link href="/devis">
                  <Button className="w-full bg-slate-900 hover:bg-amber-500 hover:text-slate-900 text-white rounded-lg transition-all">
                    Devis gratuit
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-slate-400 mt-8">* Prix à partir de, hors transport longue distance. Tarif final fourni sur devis personnalisé.</p>
        </div>
      </section>

      {/* Types de Déchets */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-600 font-bold tracking-wider uppercase text-sm">Tous types de déchets</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-3 mb-6">
              Quelle benne pour vos déchets ?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {typesDechet.map((type) => (
              <Link key={type.nom} href={type.href} className="bg-white rounded-2xl p-8 border border-slate-100 hover:border-amber-300 hover:shadow-lg transition-all group">
                <div className={`w-14 h-14 ${type.color} rounded-xl flex items-center justify-center mb-6`}>
                  <type.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-amber-600 transition-colors">{type.nom}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{type.desc}</p>
                <div className="mt-4 text-amber-600 font-semibold text-sm flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  En savoir plus <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-600 font-bold tracking-wider uppercase text-sm">Simple & Rapide</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-3 mb-6">
              Comment louer une benne ?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {etapes.map((etape) => (
              <div key={etape.num} className="relative">
                <div className="text-6xl font-black text-amber-100 mb-4">{etape.num}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{etape.titre}</h3>
                <p className="text-slate-500 leading-relaxed">{etape.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments Grid */}
      <section className="py-24 bg-slate-900 text-slate-300">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Location de benne par département</h2>
            <p className="max-w-2xl mx-auto text-lg text-slate-400">
              Trouvez un loueur de benne certifié dans votre département. Tarifs locaux, livraison rapide.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
            {[
              { name: "Paris", code: "75" }, { name: "Seine-et-Marne", code: "77" },
              { name: "Yvelines", code: "78" }, { name: "Essonne", code: "91" },
              { name: "Hauts-de-Seine", code: "92" }, { name: "Seine-St-Denis", code: "93" },
              { name: "Val-de-Marne", code: "94" }, { name: "Val-d'Oise", code: "95" },
              { name: "Rhône", code: "69" }, { name: "Nord", code: "59" },
              { name: "Gironde", code: "33" }, { name: "Bouches-du-Rhône", code: "13" },
              { name: "Haute-Garonne", code: "31" }, { name: "Loire-Atlantique", code: "44" },
              { name: "Hérault", code: "34" }, { name: "Bas-Rhin", code: "67" },
            ].map((dept) => (
              <Link
                key={dept.code}
                href={`/departements/${dept.name.toLowerCase().replace(/ /g, '-').replace(/[^\\w-]+/g, '').replace(/'/g, '')}-${dept.code}`}
                className="px-5 py-2.5 bg-slate-800 hover:bg-amber-500 hover:text-slate-900 rounded-full text-sm font-medium transition-all"
              >
                {dept.name} ({dept.code})
              </Link>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/departements" className="inline-flex items-center text-amber-400 font-bold text-lg hover:text-white transition-colors">
              Explorer tous les départements <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Guides / Blog Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-600 font-bold tracking-wider uppercase text-sm">Blog & Guides Experts</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-3 mb-6">
              Nos derniers guides pratiques
            </h2>
            <p className="text-lg text-slate-600">
              Conseils d&apos;experts, réglementation, astuces pour économiser — tout pour réussir votre projet.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {guides.slice(0, 3).map((guide) => (
              <Link key={guide.slug} href={`/guides/${guide.slug}`} className="group">
                <article className="bg-white border border-slate-200 rounded-2xl overflow-hidden h-full flex flex-col hover:shadow-xl hover:border-amber-200 transition-all duration-300">
                  <div className="relative w-full h-48">
                    <Image src={guide.image} alt={guide.imageAlt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <span className={`${guidesCategories[guide.category].color} px-2.5 py-1 rounded-full text-xs font-semibold w-fit mb-3`}>
                      {guidesCategories[guide.category].icon} {guidesCategories[guide.category].label}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors leading-snug">{guide.title}</h3>
                    <p className="text-sm text-slate-500 mb-4 flex-1 line-clamp-2">{guide.excerpt}</p>
                    <span className="text-amber-600 font-semibold text-sm flex items-center gap-1">
                      Lire le guide <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/guides" className="inline-flex items-center gap-2 bg-slate-900 text-white font-bold px-8 py-4 rounded-xl hover:bg-amber-500 hover:text-slate-900 transition-all shadow-lg">
              <BookOpen className="h-5 w-5" /> Voir tous les guides <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-extrabold text-center text-slate-900 mb-16">Questions Fréquentes</h2>

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                  { "@type": "Question", "name": "Quel est le prix d'une location de benne ?", "acceptedAnswer": { "@type": "Answer", "text": "Le prix dépend du volume (3m³ à 30m³), du type de déchet et de votre localisation. Comptez entre 149€ pour une benne 3m³ et 599€ pour une benne 30m³." } },
                  { "@type": "Question", "name": "Faut-il une autorisation pour poser une benne ?", "acceptedAnswer": { "@type": "Answer", "text": "Si la benne est posée sur un terrain privé, aucune autorisation n'est nécessaire. Sur la voie publique, il faut demander une autorisation d'occupation temporaire en mairie (délai moyen 8 jours)." } },
                  { "@type": "Question", "name": "Quels déchets peut-on mettre dans une benne ?", "acceptedAnswer": { "@type": "Answer", "text": "Gravats, encombrants, déchets verts et DIB sont acceptés. Les déchets dangereux (amiante, peintures, solvants) sont strictement interdits." } },
                  { "@type": "Question", "name": "Combien de temps peut-on garder une benne ?", "acceptedAnswer": { "@type": "Answer", "text": "La durée standard est de 7 jours. Des extensions sont possibles selon les loueurs, généralement avec un supplément journalier." } },
                ]
              })
            }}
          />

          <div className="bg-slate-50 border border-slate-200 p-8 rounded-3xl">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-b-slate-200">
                <AccordionTrigger className="text-xl font-bold text-slate-900 py-5">Quel est le prix d&apos;une location de benne ?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-lg leading-relaxed pb-5">
                  Le prix dépend du <strong>volume</strong> (3m³ à 30m³), du <strong>type de déchet</strong> et de votre <strong>localisation</strong>. Comptez entre <strong>149€ TTC pour une benne 3m³</strong> et <strong>599€ TTC pour une benne 30m³</strong>. Les gravats sont généralement plus chers que les encombrants en raison de leur poids.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-b-slate-200">
                <AccordionTrigger className="text-xl font-bold text-slate-900 py-5">Faut-il une autorisation pour poser une benne ?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-lg leading-relaxed pb-5">
                  Si la benne est posée sur un <strong>terrain privé</strong> (jardin, cour, parking), aucune autorisation n&apos;est nécessaire. En revanche, pour un dépôt sur la <strong>voie publique</strong> (trottoir, chaussée), vous devez obtenir une autorisation d&apos;occupation temporaire auprès de votre <strong>mairie</strong>. Le délai moyen est de 8 jours ouvrés.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-b-slate-200">
                <AccordionTrigger className="text-xl font-bold text-slate-900 py-5">Quels déchets peut-on mettre dans une benne ?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-lg leading-relaxed pb-5">
                  Les bennes acceptent les <strong>gravats</strong> (béton, briques, tuiles), les <strong>encombrants</strong> (meubles, électroménagers), les <strong>déchets verts</strong> (tontes, branchages) et les <strong>DIB</strong> (bois, métal, plastique). Les déchets dangereux (amiante, peintures, solvants, batteries) sont <strong>strictement interdits</strong>.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-xl font-bold text-slate-900 py-5">Combien de temps peut-on garder une benne ?</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-lg leading-relaxed pb-5">
                  La durée de location standard est de <strong>7 jours</strong>. Des extensions sont possibles selon les loueurs, généralement avec un supplément journalier de 10 à 30€. En cas de dépôt sur la voie publique, la durée est limitée par l&apos;autorisation de la mairie.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* À Propos Section */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div className="relative">
              <div className="relative w-full h-80 md:h-[450px] rounded-3xl overflow-hidden shadow-2xl">
                <Image src="/images/about-team.png" alt="Équipe de professionnels de la location de bennes" fill className="object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-amber-500 text-white p-6 rounded-2xl shadow-xl hidden md:block">
                <div className="text-3xl font-black">+35 000</div>
                <div className="text-sm font-medium">villes couvertes</div>
              </div>
            </div>

            <div>
              <span className="text-amber-600 font-bold tracking-wider uppercase text-sm">Qui sommes-nous</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-3 mb-6">Les experts de la location de benne en France</h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Prix-Location-Benne.fr est la <strong>plateforme de référence</strong> pour comparer les tarifs de location de bennes partout en France. Nous mettons en relation particuliers et professionnels avec un réseau de <strong>loueurs certifiés</strong> dans plus de 35 000 communes.
              </p>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Notre mission : vous faire <strong>gagner du temps et de l&apos;argent</strong> en centralisant les offres des meilleurs prestataires locaux. Devis gratuit, sans engagement, livraison sous 24h.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="bg-amber-100 p-2 rounded-lg"><Award className="h-5 w-5 text-amber-600" /></div>
                  <div><div className="font-bold text-slate-900 text-sm">Loueurs certifiés</div><div className="text-xs text-slate-500">Partenaires vérifiés</div></div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-lg"><Leaf className="h-5 w-5 text-green-600" /></div>
                  <div><div className="font-bold text-slate-900 text-sm">Éco-responsable</div><div className="text-xs text-slate-500">Traitement conforme</div></div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg"><Users className="h-5 w-5 text-blue-600" /></div>
                  <div><div className="font-bold text-slate-900 text-sm">Conseil expert</div><div className="text-xs text-slate-500">Guides & accompagnement</div></div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 p-2 rounded-lg"><MapPin className="h-5 w-5 text-purple-600" /></div>
                  <div><div className="font-bold text-slate-900 text-sm">Couverture nationale</div><div className="text-xs text-slate-500">35 000+ communes</div></div>
                </div>
              </div>

              <Link href="/a-propos" className="inline-flex items-center gap-2 text-amber-600 font-bold hover:text-amber-500 transition-colors">
                En savoir plus sur notre mission <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-24 bg-amber-50 text-slate-900 text-center border-t border-amber-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8">Votre devis en 2 minutes</h2>
          <p className="text-xl text-amber-800 mb-12 max-w-2xl mx-auto font-medium">
            Comparez les prix des loueurs de bennes dans votre ville. Service 100% gratuit, sans engagement.
          </p>
          <Link href="/devis">
            <Button size="lg" className="bg-amber-500 text-slate-900 hover:bg-amber-600 font-bold text-xl px-12 py-8 rounded-full shadow-2xl transition-all transform hover:scale-105 hover:-translate-y-1">
              Comparer les Prix
            </Button>
          </Link>
          <div className="mt-8 flex justify-center gap-6 text-sm font-semibold text-amber-700/60 uppercase tracking-widest">
            <span>Gratuit</span>
            <span>Rapide</span>
            <span>Local</span>
          </div>
        </div>
      </section>
    </div>
  );
}
