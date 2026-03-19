import About from "@/src/features/landing/components/About";
import Contact from "@/src/features/landing/components/Contact";
import HeroImage from "@/src/features/landing/components/HeroImage";
import Location from "@/src/features/landing/components/Location";
import MarcasClientes from "@/src/features/landing/components/MarcasClientes";
import Projects from "@/src/features/landing/components/Projects";

export default function Home() {
  return (
    <>
      <HeroImage />
      <div className="max-w-7xl mx-auto p-6 space-y-20">
        <About />
        <Projects />
        <div className="space-y-10">
          <p className="text-lg lg:text-4xl text-center">Donde tu <span className="text-gold">producción</span> nos necesite</p>
          <Location />
        </div>
      </div>
      <MarcasClientes />
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <Contact />
      </div>

    </>
  );
}
