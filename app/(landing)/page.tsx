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
      {/* HERO (sin animación o muy sutil) */}
      <HeroImage />

      <div className="max-w-7xl mx-auto p-6 space-y-20">

        {/* ABOUT */}
        <div data-aos="fade-up">
          <About />
        </div>

        {/* PROJECTS */}
        <div data-aos="fade-up" data-aos-delay="100">
          <Projects />
        </div>

        {/* LOCATION + TEXTO */}
        <div className="space-y-10">

          <p
            className="text-lg lg:text-4xl text-center"
            data-aos="fade-up"
          >
            Donde tu <span className="text-gold">producción</span> nos necesite
          </p>

          <div data-aos="zoom-in" data-aos-delay="150">
            <Location />
          </div>

        </div>
      </div>

      <MarcasClientes />

      {/* CONTACT */}
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div data-aos="fade-up" data-aos-delay="100">
          <Contact />
        </div>
      </div>

    </>
  );
}