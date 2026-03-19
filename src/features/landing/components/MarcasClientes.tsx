"use client";

import Image from "next/image";
import { useState } from "react";

export default function MarcasClientes() {

  const techStack = [
    "/clientesMarcas/IMG_1399.JPG",
    "/clientesMarcas/IMG_3680.JPG",
    "/clientesMarcas/IMG_3681.JPG",
    "/clientesMarcas/IMG_3682.JPG",
    "/clientesMarcas/IMG_3683.JPG",
    "/clientesMarcas/IMG_3684.JPG",
    "/clientesMarcas/IMG_3686.JPG",
    "/clientesMarcas/IMG_3687.JPG",
    "/clientesMarcas/IMG_3688.JPG",
  ];

  return (
    <section className="py-16 overflow-hidden bg-white/5  relative">

      <p className="text-center text-slate-400 text-xs md:text-lg font-mono mb-10 uppercase tracking-widest">
        Empresas que confían en nosotros
      </p>

      {/* Fades laterales */}
      <div className="absolute top-0 bottom-0 left-0 w-20 md:w-32 z-10 bg-linear-to-r from-[#030712] to-transparent pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-20 md:w-32 z-10 bg-linear-to-l from-[#030712] to-transparent pointer-events-none" />

      <div
        className="flex w-full overflow-hidden"
      >
        <div
          className={`flex items-center gap-10 md:gap-16 whitespace-nowrap animate-scroll`}
        >
          {[...techStack, ...techStack].map((tech, i) => (
            <div
              key={`logo-${i}`}
              className="flex items-center justify-center min-w-20 md:min-w-30"
            >
              <Image
                src={tech}
                alt={`Logo ${i}`}
                width={100}
                height={100}
                className="object-contain hover:scale-110 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}