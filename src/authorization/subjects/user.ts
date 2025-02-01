import { z } from 'zod'
import { userSchema } from '../models/Member'

export const userSubject = z.tuple([
  z.union([
    z.literal('create'),
    z.literal('delete'),
    z.literal('invite'),
    z.literal('manage'),
  ]),
  z.union([z.literal('User'), userSchema]),
])

export type UserSubject = z.infer<typeof userSubject>
