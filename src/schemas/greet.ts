import { z } from 'zod'

export const greetSchema = z.object({
    name: z.string(),
})
