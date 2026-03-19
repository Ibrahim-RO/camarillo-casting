"use client";

import Image from "next/image";

export default function HeroImage() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">

      {/* Imagen de fondo optimizada */}
      <Image
        src="/hero.png"
        alt="Hero background"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Overlay oscuro (MUY importante para UX) */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Contenido */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center px-6 space-y-6">
        <div className="border border-gold w-fit px-6 py-2 rounded-full">
            <p className="text-sm text-gold">México</p>
        </div>
        <h1 className="font-serif text-4xl md:text-6xl font-bold text-gold uppercase">
          REGISTRATE EN NUESTRO CASTING
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          Buscamos talento para las producciones más importantes de la industria cinematográfica y televisiva.
        </p>
        <button
            className="bg-gold hover:bg-yellow-600 cursor-pointer transition-colors duration-300 text-lg text-black font-semibold px-4 py-3 rounded-lg"
        >Contáctanos</button>
      </div>

    </section>
  );
}