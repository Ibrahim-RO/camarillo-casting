"use client";

import { useEffect, useRef } from "react";
import { ModalContact } from "./ModalContact";
import Link from "next/link";

export default function HeroImage() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Respect the user's motion preference: freeze on the first frame instead of autoplaying.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      videoRef.current?.pause();
    }
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">

      {/* Video de fondo */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover object-center"
        src="/hero-cam.webm"
        poster="/hero.png"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Contenido */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center px-6 space-y-6">

        {/* Badge */}
        <div
          data-aos="fade-down"
          data-aos-delay="100"
          className="
            flex items-center gap-2
            px-5 py-2
            rounded-full
            bg-black/40
            backdrop-blur-md
            border border-gold/40
            shadow-[0_0_20px_rgba(201,167,79,0.15)]
            hover:scale-105 transition-all duration-300
          "
        >
          <p className="text-xs tracking-[0.2em] uppercase text-gold font-semibold">
            México
          </p>
        </div>

        {/* Título */}
        <h1
          data-aos="fade-up"
          data-aos-delay="200"
          className="font-serif text-3xl md:text-6xl font-bold text-gold uppercase"
        >
          ENCUENTRA EL CASTING IDEAL PARA TU PRODUCCIÓN

        </h1>

        <p className="text-xl md:text-2xl font-semibold">Casting profesional para producciones audiovisuales.</p>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <article className="space-y-3">
            <p className="font-bold">Contratación de servicios de Casting</p>
            <ModalContact />
          </article>

          <article className="space-y-3">
            <p className="mb-6 font-bold">Registrate en nuestro Casting</p>
            <Link href="#contacto" className="bg-gold hover:brightness-90 text-base sm:text-lg text-black font-semibold px-5 sm:px-6 rounded-lg h-8 sm:h-12 cursor-pointer py-3 scroll-m-80">Contacto</Link>
          </article>
        </section>


      </div>

    </section>
  );
}
