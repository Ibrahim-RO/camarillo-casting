"use client"

import { useState } from "react"
import emailjs from '@emailjs/browser'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ChevronDown } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormSchema } from "../schemas"
import { toast } from "sonner"

const GOLD = "#C8A96A"

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string
  required?: boolean
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-semibold tracking-[0.06em] uppercase text-white/50">
        {label}
        {required && <span className="ml-1" style={{ color: GOLD }}>*</span>}
      </label>
      {children}
      {error && <span className="text-red-500 text-xs">{error}</span>}
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

const SERVICE_ID = 'service_61ag73f'
const TEMPLATE_ID = 'template_1e5rz4o'
const PUBLIC_KEY = 'N8z0vPYXAyesIEt1F'

export function ModalContact() {
  const [needs, setNeeds] = useState({
    Extras: false,
    Talentos: false,
  })

  const [open, setOpen] = useState(false)

  const closeModal = () => setOpen(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<Form>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      needs: [],
    },
  })

  const toggleNeed = (key: keyof typeof needs) => {
    const updated = { ...needs, [key]: !needs[key] }
    setNeeds(updated)

    const selected = Object.entries(updated)
      .filter(([_, v]) => v)
      .map(([k]) => k)

    setValue("needs", selected as Form['needs'], { shouldValidate: true })
  }

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const onSubmit = async (data: Form) => {
    setStatus("loading")
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        from_name: data.name,
        company: data.company,
        reply_to: data.email,
        phone: data.phone || "No proporcionado",
        type_production: data.typeProduction,
        needs: data.needs.join(", "),
      }, PUBLIC_KEY)

      setStatus("success")
      reset()
      setNeeds({ Extras: false, Talentos: false })
      toast.success("Correo enviado correctamente")
      closeModal()
    } catch (error) {
      console.error("EmailJS Error:", error)
      setStatus("error")
      toast.error("Error al enviar el correo")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gold hover:brightness-90 text-base sm:text-lg text-black font-semibold px-5 sm:px-6 rounded-lg h-8 sm:h-12 cursor-pointer">
          Registrate
        </Button>
      </DialogTrigger>

      <DialogContent
        className="w-[calc(100vw-1.5rem)] rounded-xl p-0 border-0 shadow-2xl"
        style={{
          backgroundColor: "#0D0D0D",
          border: "1px solid rgba(200,169,106,0.2)",
          maxWidth: "680px",
        }}
      >
        {/* Línea dorada */}
        <div
          className="h-px w-full"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${GOLD} 50%, transparent 100%)`,
          }}
        />

        <div className="overflow-y-auto max-h-[90vh]">
          {/* HEADER */}
          <div className="px-6 sm:px-8 pt-6 pb-2">
            <DialogTitle
              className="text-[22px] sm:text-[26px] font-serif"
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
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-6 sm:px-8 pb-6 flex flex-col gap-4"
          >
            {/* Nombre / Empresa */}
            <Field label="Tu nombre" required error={errors.name?.message}>
              <input
                className={inputCls}
                placeholder="Ej. María García"
                {...register("name")}
              />
            </Field>

            <Field
              label="Empresa/Producción"
              required
              error={errors.company?.message}
            >
              <input
                className={inputCls}
                placeholder="Ej. Studio Norte"
                {...register("company")}
              />
            </Field>

            {/* Email / Teléfono */}
            <Field label="Email" required error={errors.email?.message}>
              <input
                type="email"
                className={inputCls}
                placeholder="correo@ejemplo.com"
                {...register("email")}
              />
            </Field>

            <Field label="Teléfono" error={errors.phone?.message}>
              <input
                type="tel"
                className={inputCls}
                placeholder="+52 55 0000 0000"
                {...register("phone")}
              />
            </Field>

            {/* Select */}
            <Field
              label="Tipo de producción"
              required
              error={errors.typeProduction?.message}
            >
              <div className="relative">
                <select
                  {...register("typeProduction")}
                  defaultValue=""
                  className="w-full h-10 px-3 pr-9 rounded-md text-sm text-white bg-transparent border border-white/20 outline-none appearance-none focus:border-[#C8A96A]"
                >
                  <option value="" disabled style={{ background: "#111" }}>
                    Selecciona un tipo
                  </option>
                  {[
                    "pelicula",
                    "serie",
                    "comercial",
                    "cortometraje",
                    "documental",
                  ].map((o) => (
                    <option key={o} value={o} style={{ background: "#111" }}>
                      {o}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4"
                  style={{ color: GOLD }}
                />
              </div>
            </Field>

            {/* Needs */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-semibold uppercase text-white/50">
                ¿Qué necesitas?
                <span className="ml-1" style={{ color: GOLD }}>
                  *
                </span>
              </label>

              <div className="flex flex-wrap gap-2">
                {(Object.keys(needs) as (keyof typeof needs)[]).map(
                  (item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleNeed(item)}
                      className="flex items-center gap-2 px-4 py-2 rounded-md text-sm border"
                      style={{
                        borderColor: needs[item]
                          ? GOLD
                          : "rgba(255,255,255,0.2)",
                        backgroundColor: needs[item]
                          ? "rgba(200,169,106,0.12)"
                          : "transparent",
                        color: needs[item]
                          ? GOLD
                          : "rgba(255,255,255,0.6)",
                      }}
                    >
                      {item}
                    </button>
                  )
                )}
              </div>

              {errors.needs && (
                <span className="text-red-500 text-xs">
                  {errors.needs.message as string}
                </span>
              )}
            </div>

            {/* Footer */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-4">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="ghost"
                  className="border border-white/15 text-white/60 hover:text-white"
                >
                  Cancelar
                </Button>
              </DialogClose>

              <Button
                type="submit"
                disabled={status === "loading"}
                className="bg-gold text-black font-semibold hover:brightness-90"
              >
                {status === "loading" ? "Enviando..." : "Enviar Solicitud"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}