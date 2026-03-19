"use client";

import Image from "next/image";
import { useState } from "react";

type Category = "peliculas" | "series" | "comerciales" | "rodaje";

export default function Projects() {
    const [active, setActive] = useState<Category>("peliculas");

    const data: Record<Category, string[]> = {
        peliculas: [
            "/proyectos/pelicula1.jpg",
            "/proyectos/pelicula2.jpg",
            "/proyectos/pelicula3.jpg",
            "/proyectos/pelicula4.jpg",
        ],
        series: [
            "/proyectos/serie1.jpg",
            "/proyectos/serie2.jpg",
            "/proyectos/serie3.jpg",
            "/proyectos/serie4.jpg",
        ],
        comerciales: [
            "/proyectos/comercial1.jpg",
            "/proyectos/comercial2.jpg",
            "/proyectos/comercial3.jpg",
            "/proyectos/comercial4.jpg",
        ],
        rodaje: [
            "/proyectos/rodaje1.jpg",
            "/proyectos/rodaje2.jpg",
            "/proyectos/rodaje3.jpg",
            "/proyectos/rodaje4.jpg",
        ],
    };

    const tabs = [
        { id: "peliculas", label: "Películas" },
        { id: "series", label: "Series" },
        { id: "comerciales", label: "Comerciales" },
        { id: "rodaje", label: "En Rodaje" },
    ];

    return (
        <section className="bg-[#0b0b0b] text-white">

            {/* Título */}
            <div className="mb-10 max-w-3xl">
                <h2 className="text-4xl md:text-5xl font-serif mb-4">
                    Nuestros <span className="text-gold">Proyectos</span>
                </h2>
                <p className="text-gray-400 text-sm md:text-base">
                    Un recorrido por algunas de las producciones en las que hemos colaborado,
                    aportando talento, organización y presencia en pantalla.
                </p>
            </div>

            {/* Tabs */}
            <div className="flex gap-8 border-b border-gray-700 mb-10">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActive(tab.id as Category)}
                        className={`pb-3 px-4 text-sm md:text-base transition-all duration-300
              ${active === tab.id
                                ? "bg-gold text-black rounded-t-md"
                                : "text-gray-300 hover:text-white"
                            }
            `}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Galería */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {data[active].map((img, i) => (
                    <div
                        key={i}
                        className="relative w-full h-62.5 overflow-hidden rounded-md group"
                    >
                        <Image
                            src={img}
                            alt={`Proyecto ${i}`}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />

                        {/* Overlay hover */}
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition" />
                    </div>
                ))}
            </div>

        </section>
    );
}