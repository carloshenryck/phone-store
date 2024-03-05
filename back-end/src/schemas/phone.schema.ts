import { z } from "zod";

export const basicPhoneSchema = z.object({
  name: z.string(),
  brand: z.string(),
  model: z.string(),
  price: z.number(),
  color: z.string(),
})

export const phoneWithDetailsSchema = basicPhoneSchema.extend({
  details: z.object({
    brand: z.string(),
    model: z.string(),
    color: z.string(),
  }),
}).omit({brand: true, model: true, color: true})

export const phoneWithVariationsSchema = basicPhoneSchema.extend({
  data: z.array(
    z.object({
      price: z.number(),
      color: z.string(),
    })
  )
}).omit({price: true, color: true})