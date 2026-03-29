"use client";

import Image from "next/image";
import { ModalContact } from "./ModalContact";
import Link from "next/link";

export default function HeroImage() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">

      {/* Imagen de fondo */}
      <Image
        src="/hero.png"
        alt="Hero background"
        fill
        priority
        className="object-cover object-center"
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
          REGISTRATE EN NUESTRO CASTING
        </h1>

        {/* Texto */}
        <p
          data-aos="fade-up"
          data-aos-delay="300"
          className="text-base md:text-xl text-gray-300 max-w-2xl mx-auto"
        >
          Buscamos talentos y extras para las producciones más importantes de la industria cinematográfica y televisiva.
        </p>

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