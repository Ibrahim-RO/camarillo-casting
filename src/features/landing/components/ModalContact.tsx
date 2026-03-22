"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { ChevronDown } from "lucide-react"

const GOLD = "#C8A96A"

// Input base sin los estilos de shadcn que generan fondo gris
function Field({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-semibold tracking-[0.06em] uppercase text-white/50">
        {label}
        {required && <span className="ml-1" style={{ color: GOLD }}>*</span>}
      </label>
      {children}
    </div>
  )
}

const inputCls = `
  w-full h-10 px-3 rounded-md text-sm text-white bg-transparent
  border border-white/20 outline-none
  placeholder:text-white/25
  focus:border-[#C8A96A]
  transition-colors duration-150
`

export function ModalContact() {
  const [needs, setNeeds] = useState({ Actores: false, Modelos: false, Extras: false })

  const toggleNeed = (key: keyof typeof needs) =>
    setNeeds((prev) => ({ ...prev, [key]: !prev[key] }))

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="bg-gold hover:brightness-90 text-base sm:text-lg text-black font-semibold px-5 sm:px-6 rounded-lg transition-all duration-300 cursor-pointer h-11 sm:h-12"
          data-aos="zoom-in"
          data-aos-delay="400"
        >
          Contacto
        </Button>
      </DialogTrigger>

      <DialogContent
        className="w-[calc(100vw-1.5rem)] max-w-195 sm:max-w-150! rounded-xl p-0 border-0 shadow-2xl [&>button]:text-white/50 [&>button]:hover:text-white"
        style={{ backgroundColor: "#0D0D0D", border: "1px solid rgba(200,169,106,0.2)", maxWidth: "780px", width: "calc(100vw - 1.5rem)" }}
      >
        {/* Línea dorada superior */}
        <div
          className="h-px w-full rounded-t-xl"
          style={{ background: `linear-gradient(90deg, transparent 0%, ${GOLD} 50%, transparent 100%)` }}
        />

        {/* Scroll container — oculta el scrollbar nativo */}
        <div
          className="overflow-y-auto"
          style={{
            maxHeight: "calc(90vh - 2px)",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <style>{`.modal-scroll::-webkit-scrollbar { display: none; }`}</style>

          {/* HEADER */}
          <div className="px-6 sm:px-8 pt-6 pb-2">
            <DialogTitle
              className="text-[22px] sm:text-[26px] font-serif leading-tight"
              style={{ color: GOLD }}
            >
              Hagamos tu proyecto realidad
            </DialogTitle>
            <p className="text-white/35 text-xs sm:text-sm mt-1.5">
              Completa el formulario y nos pondremos en contacto contigo.
            </p>
          </div>

          <div className="mx-6 sm:mx-8 my-4 border-t border-white/[0.07]" />

          {/* FORM */}
          <form className="px-6 sm:px-8 pb-2 flex flex-col gap-4">

            {/* Fila 1 */}
            <div className="flex flex-col gap-4">
              <Field label="Tu nombre" required>
                <input className={inputCls} placeholder="Ej. María García" />
              </Field>
              <Field label="Empresa/Producción" required>
                <input className={inputCls} placeholder="Ej. Studio Norte" />
              </Field>
            </div>

            {/* Fila 2 */}
            <div className="flex flex-col gap-4">
              <Field label="Email" required>
                <input type="email" className={inputCls} placeholder="correo@ejemplo.com" />
              </Field>
              <Field label="Teléfono">
                <input type="tel" className={inputCls} placeholder="+52 55 0000 0000" />
              </Field>
            </div>

            {/* Tipo de producción */}
            <Field label="Tipo de producción" required>
              <div className="relative">
                <select
                  className="w-full h-10 px-3 pr-9 rounded-md text-sm text-white bg-transparent border border-white/20 outline-none appearance-none focus:border-[#C8A96A] transition-colors duration-150 cursor-pointer"
                  defaultValue=""
                >
                  <option value="" disabled style={{ backgroundColor: "#111" }}>Selecciona un tipo</option>
                  {["Película", "Serie", "Comercial", "Cortometraje", "Documental"].map((o) => (
                    <option key={o} value={o.toLowerCase()} style={{ backgroundColor: "#111" }}>{o}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: GOLD }} />
              </div>
            </Field>

            {/* ¿Qué necesitas? */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-semibold tracking-[0.06em] uppercase text-white/50">
                ¿Qué necesitas?<span className="ml-1" style={{ color: GOLD }}>*</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(needs) as (keyof typeof needs)[]).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleNeed(item)}
                    className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium border transition-all duration-150 cursor-pointer"
                    style={{
                      borderColor: needs[item] ? GOLD : "rgba(255,255,255,0.18)",
                      backgroundColor: needs[item] ? "rgba(200,169,106,0.12)" : "transparent",
                      color: needs[item] ? GOLD : "rgba(255,255,255,0.55)",
                    }}
                  >
                    {/* Checkbox cuadrado */}
                    <span
                      className="w-4 h-4 rounded-[3px] border flex items-center justify-center shrink-0 transition-all duration-150"
                      style={{
                        borderColor: needs[item] ? GOLD : "rgba(255,255,255,0.3)",
                        backgroundColor: needs[item] ? GOLD : "transparent",
                      }}
                    >
                      {needs[item] && (
                        <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                          <path d="M1 3.5L3.5 6L8 1" stroke="#0D0D0D" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                    {item}
                  </button>
                ))}
              </div>
            </div>

          </form>

          <div className="mx-6 sm:mx-8 mt-4 border-t border-white/[0.07]" />

          {/* FOOTER */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 px-6 sm:px-8 py-5">
            <DialogClose asChild>
              <Button
                variant="ghost"
                className="h-10 text-sm border border-white/15 text-white/60 hover:text-white hover:bg-white/5 hover:border-white/30 bg-transparent transition-all duration-150"
              >
                Cancelar
              </Button>
            </DialogClose>

            <Button
              type="submit"
              className="bg-gold h-10 text-sm font-semibold text-black hover:brightness-90 transition-all duration-150 cursor-pointer"
            >
              Enviar Solicitud
            </Button>
          </div>
        </div>

      </DialogContent>
    </Dialog>
  )
}