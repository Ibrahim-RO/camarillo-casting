"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");

  const navLinks = [
    { name: "Inicio", href: "#inicio", id: "inicio" },
    { name: "Nosotros", href: "#nosotros", id: "nosotros" },
    { name: "Proyectos", href: "#proyectos", id: "proyectos" },
    { name: "Ubicación", href: "#ubicacion", id: "ubicacion" },
    { name: "Clientes", href: "#clientes", id: "clientes" },
    { name: "Contacto", href: "#contacto", id: "contacto" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        {
          rootMargin: "-30% 0px -60% 0px", // activa cuando la sección ocupa el tercio superior
          threshold: 0,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <>
      <header
        className={`w-full fixed top-0 left-0 z-50 transition-all duration-500 ${scrolled ? "bg-black/60 backdrop-blur-md py-3" : "bg-transparent py-5"
          }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6">

          {/* Logo */}
          <Image
            src="/logoBlanco.png"
            alt="Logo Camarillo"
            width={150}
            height={150}
            className="w-28"
          />

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`
                    relative mx-4 font-medium transition-colors duration-300
                    after:content-[''] after:absolute after:-bottom-1 after:left-0
                    after:h-px after:transition-all after:duration-300
                    ${isActive
                      ? "text-gold after:w-full after:bg-gold"
                      : "text-gray-200 hover:text-gold after:w-0 after:bg-gold hover:after:w-full"
                    }
                  `}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/80 backdrop-blur-lg transform transition-transform duration-500 ${open ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8 text-2xl font-semibold">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`transition-colors duration-300 ${isActive ? "text-gold" : "text-white hover:text-gold"
                  }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}