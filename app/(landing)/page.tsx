"use client";

import About from "@/src/features/landing/components/About";
import Contact from "@/src/features/landing/components/Contact";
import HeroImage from "@/src/features/landing/components/HeroImage";
import Location from "@/src/features/landing/components/Location";
import MarcasClientes from "@/src/features/landing/components/MarcasClientes";
import Projects from "@/src/features/landing/components/Projects";

export default function Home() {
  return (
    <>
      <section id="inicio">
        <HeroImage />
      </section>

      <div className="max-w-7xl mx-auto p-6 space-y-20">

        <section id="nosotros" className="scroll-mt-20" data-aos="fade-up">
          <About />
        </section>

        <section id="proyectos" className="scroll-mt-20" data-aos="fade-up" data-aos-delay="100">
          <Projects />
        </section>
      </div>

      <section id="ubicacion" className="scroll-mt-20 w-full lg:max-w-7xl lg:mx-auto">
        <h2 className="text-3xl md:text-5xl font-serif mb-8 text-center">
          Donde tu <span className="text-gold">producción</span> nos necesite
        </h2>
        <div data-aos="zoom-in" data-aos-delay="150">
          <Location />
        </div>
      </section>

      <section id="clientes" className="scroll-mt-20 my-5">
        <MarcasClientes />
      </section>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <section id="contacto" className="scroll-mt-20" data-aos="fade-up" data-aos-delay="100">
          <Contact />
        </section>
      </div>
    </>
  );
}