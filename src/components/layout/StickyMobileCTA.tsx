"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { usePathname } from "next/navigation";

export function StickyMobileCTA() {
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);
    const pathname = usePathname();

    // Don't show on /devis page
    const isDevisPage = pathname === "/devis";

    useEffect(() => {
        if (isDevisPage || isDismissed) return;

        function handleScroll() {
            // Show after scrolling 400px down
            setIsVisible(window.scrollY > 400);
        }

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isDevisPage, isDismissed]);

    if (isDevisPage || isDismissed || !isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
            <div className="bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] px-4 py-3 flex items-center gap-3">
                <Link
                    href="/devis"
                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-colors"
                >
                    Devis gratuit <ArrowRight className="h-4 w-4" />
                </Link>
                <button
                    onClick={() => setIsDismissed(true)}
                    className="p-2 text-slate-400 hover:text-slate-600 transition-colors shrink-0"
                    aria-label="Fermer"
                >
                    <X className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
}
