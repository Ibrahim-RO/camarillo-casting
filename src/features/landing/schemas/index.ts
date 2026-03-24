import z from "zod"

export const ContactSchema = z.object({
    name: z.string(),
    info: z.string(),
    description: z.string(),
    icon: z.any(),
})

export const SocialMediaSchema = z.object({
    name: z.string(),
    info: z.string(),
    url: z.string(),
    icon: z.any(),
})

export const FormSchema = z.object({
    name: z.string().min(1, "El nombre es obligatorio"),
    company: z.string().min(1, "La empresa es obligatoria"),
    email: z.email("Email no válido"),
    phone: z.string().refine((val) => !val || /^[0-9+\s()-]{7,}$/.test(val), {message: "Teléfono inválido",}),
    typeProduction: z.string("Tipo de producción requerida"),
    needs: z.array(z.enum(["Actores", "Modelos", "Extras"])).min(1, "Selecciona al menos una opción"),
})

export type Contact = z.infer<typeof ContactSchema>
export type SocialMedia = z.infer<typeof SocialMediaSchema>
export type Form = z.infer<typeof FormSchema>