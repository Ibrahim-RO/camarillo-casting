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

export type Contact = z.infer<typeof ContactSchema>
export type SocialMedia = z.infer<typeof SocialMediaSchema>