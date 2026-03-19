import z from 'zod'

export const ContactSchema = z.object({
    name: z.string(),
    info: z.string(),
    description: z.string()
})

export const SocialMediaSchema = z.object({
    name: z.string(),
    info: z.string(),
    url: z.string()
})

export type Contact = z.infer<typeof ContactSchema>
export type SocialMedia = z.infer<typeof SocialMediaSchema>