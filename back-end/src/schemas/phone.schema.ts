import { z } from "zod";

export const basicPhoneSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  brand: z.string().min(1, 'A marca é obrigatória'),
  model: z.string().min(1, 'O modelo é obrigatório'),
  price: z.number({invalid_type_error: 'O valor é obrigatório'}).min(1, 'O valor é obrigatório'),
  color: z.string().min(1, 'A cor é obrigatória'),
  img: z.string().min(1, 'A imagem é obrigatória'),
})

export const phoneWithDetailsSchema = basicPhoneSchema.extend({
  details: z.object({
    brand: z.string().min(1, 'A marca é obrigatória'),
    model: z.string().min(1, 'O modelo é obrigatório'),
    color: z.string().min(1, 'A cor é obrigatória'),
  }),
}).omit({brand: true, model: true, color: true})

export const phoneWithVariationsSchema = basicPhoneSchema.extend({
  data: z.array(
    z.object({
      price: z.number({invalid_type_error: 'O valor é obrigatório'}).min(1, 'O valor é obrigatório'),
      color: z.string().min(1, 'A cor é obrigatória'),
      img: z.string().min(1, 'A imagem é obrigatória'),
    })
  )
}).omit({price: true, color: true, img: true})