import { z } from "zod"

export const createMemberBodySchema = z.object({
  name: z.string(),
  address: z.string(),
  birthDate: z.date(),
  email: z.string().email(),
  phone: z.string().optional(),
})

export type CreateMemberBodySchema = z.infer<typeof createMemberBodySchema>

export const updateMemberBodySchema = z.object({
  name: z.string().optional(),
  birthDate: z.date().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
})

export type UpdateMemberBodySchema = z.infer<typeof updateMemberBodySchema>