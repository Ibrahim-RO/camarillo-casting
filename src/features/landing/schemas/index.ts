import z from 'zod'

export const ContactSchema = z.object({
    name: z.string(),
    info: z.string(),
    description: z.string()
})

export type Contact = z.infer<typeof ContactSchema>