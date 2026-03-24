"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText, Menu, X, MapPin, Truck, Euro, Hammer, Package, TreePine, Factory, ChevronDown, BookOpen } from "lucide-react";

const wasteTypes = [
    { href: "/location-benne-gravats", label: "Benne Gravats", desc: "Béton, briques, tuiles", icon: Hammer, color: "text-orange-600 bg-orange-50" },
    { href: "/location-benne-encombrants", label: "Benne Encombrants", desc: "Meubles, matelas, électroménagers", icon: Package, color: "text-blue-600 bg-blue-50" },
    { href: "/location-benne-dechets-verts", label: "Benne Déchets Verts", desc: "Tontes, branches, feuilles", icon: TreePine, color: "text-green-600 bg-green-50" },
    { href: "/location-benne-dib", label: "Benne DIB", desc: "Bois, métal, plastique, carton", icon: Factory, color: "text-purple-600 bg-purple-50" },
];

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [wasteDropdownOpen, setWasteDropdownOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
            <div className="container mx-auto flex h-16 md:h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="bg-amber-500 text-white p-1.5 rounded-lg">
                        <Truck className="h-5 w-5 md:h-6 md:w-6" />
                    </div>
                    <span className="text-lg md:text-xl font-bold text-slate-900 tracking-tight">
                        Prix-Location-Benne<span className="text-amber-500">.fr</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    <Link href="/tarifs" className="flex items-center gap-2 text-slate-600 hover:text-amber-600 font-medium transition-colors">
                        <Euro className="h-4 w-4" /> Tarifs
                    </Link>
                    <Link href="/departements" className="flex items-center gap-2 text-slate-600 hover:text-amber-600 font-medium transition-colors">
                        <MapPin className="h-4 w-4" /> Départements
                    </Link>
                    <Link href="/guides" className="flex items-center gap-2 text-slate-600 hover:text-amber-600 font-medium transition-colors">
                        <BookOpen className="h-4 w-4" /> Guides
                    </Link>

                    {/* Waste Type Dropdown */}
                    <div className="relative" onMouseEnter={() => setWasteDropdownOpen(true)} onMouseLeave={() => setWasteDropdownOpen(false)}>
                        <button className="flex items-center gap-2 text-slate-600 hover:text-amber-600 font-medium transition-colors">
                            <Truck className="h-4 w-4" /> Types de Bennes <ChevronDown className={`h-3 w-3 transition-transform ${wasteDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {wasteDropdownOpen && (
                            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-80">
                                <div className="bg-white rounded-xl shadow-xl border border-slate-100 p-3 space-y-1">
                                    {wasteTypes.map((type) => (
                                        <Link
                                            key={type.href}
                                            href={type.href}
                                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group"
                                        >
                                            <div className={`p-2 rounded-lg ${type.color}`}>
                                                <type.icon className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-slate-900 text-sm group-hover:text-amber-600">{type.label}</div>
                                                <div className="text-xs text-slate-400">{type.desc}</div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </nav>

                {/* Desktop CTA + Mobile Menu Button */}
                <div className="flex items-center gap-4">
                    <Link href="/devis" className="hidden sm:block">
                        <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white text-sm md:text-lg px-4 md:px-8 h-10 md:h-12 shadow-md hover:shadow-lg transition-all rounded-full">
                            <FileText className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                            Devis Gratuit
                        </Button>
                    </Link>

                    <button
                        className="md:hidden p-2 text-slate-600 hover:text-amber-600 transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Menu"
                    >
                        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-slate-100 shadow-lg">
                    <nav className="container mx-auto px-4 py-4 space-y-1">
                        <Link href="/tarifs" className="flex items-center gap-3 p-3 text-slate-700 hover:bg-amber-50 hover:text-amber-600 rounded-lg font-medium" onClick={() => setMobileMenuOpen(false)}>
                            <Euro className="h-5 w-5" /> Tarifs 2026
                        </Link>
                        <Link href="/departements" className="flex items-center gap-3 p-3 text-slate-700 hover:bg-amber-50 hover:text-amber-600 rounded-lg font-medium" onClick={() => setMobileMenuOpen(false)}>
                            <MapPin className="h-5 w-5" /> Départements
                        </Link>
                        <Link href="/guides" className="flex items-center gap-3 p-3 text-slate-700 hover:bg-amber-50 hover:text-amber-600 rounded-lg font-medium" onClick={() => setMobileMenuOpen(false)}>
                            <BookOpen className="h-5 w-5" /> Guides
                        </Link>

                        <div className="pt-2 pb-1 px-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Types de Bennes</div>
                        {wasteTypes.map((type) => (
                            <Link key={type.href} href={type.href} className="flex items-center gap-3 p-3 text-slate-700 hover:bg-amber-50 hover:text-amber-600 rounded-lg font-medium" onClick={() => setMobileMenuOpen(false)}>
                                <type.icon className="h-5 w-5" /> {type.label}
                            </Link>
                        ))}

                        <div className="pt-4 border-t border-slate-100">
                            <Link href="/devis" onClick={() => setMobileMenuOpen(false)}>
                                <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white h-12 rounded-full">
                                    <FileText className="mr-2 h-5 w-5" /> Devis Gratuit
                                </Button>
                            </Link>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
