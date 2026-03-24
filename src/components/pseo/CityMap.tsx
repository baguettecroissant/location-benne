"use client";

import { useRef, useState, useEffect } from "react";

interface CityMapProps {
    cityName: string;
    zip: string;
    departmentName: string;
}

export function CityMap({ cityName, zip, departmentName }: CityMapProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
            { rootMargin: "200px" }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    const query = encodeURIComponent(`${cityName}, ${zip}, ${departmentName}, France`);

    return (
        <div ref={ref} className="w-full h-64 md:h-80 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
            {isVisible ? (
                <iframe
                    title={`Carte de ${cityName}`}
                    src={`https://www.google.com/maps?q=${query}&output=embed&hl=fr`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">
                    Chargement de la carte…
                </div>
            )}
        </div>
    );
}
