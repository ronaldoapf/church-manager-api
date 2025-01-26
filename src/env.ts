import { z } from 'zod'

export const envSchema = z.object({
  JWT_SECRET: z.string(),
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().optional().default(3333),
})

export type EnvType = z.infer<typeof envSchema>
