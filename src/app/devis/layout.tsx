import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Devis Location de Benne Gratuit — Prix-Location-Benne.fr",
    description: "Demandez votre devis gratuit pour la location d'une benne. Réponse sous 2h, loueurs certifiés, livraison 24-48h partout en France.",
    alternates: { canonical: 'https://www.prix-location-benne.fr/devis' },
};

export default function DevisLayout({ children }: { children: React.ReactNode }) {
    return children;
}
