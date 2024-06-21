import { z } from "zod";

export const cartSchema = z.object({
    id: z.number().int(),
    userId: z.number().int(),
    cartProducts: z.array(
        z.object({
            products: z.object({
                id: z.number().int(),
                name: z.string(),
                image: z.array(z.string()),
                price: z.number(),
                desc: z.array(z.string()),
                stock: z.number().int(),
            }),
            quantity: z.number().int().nullable(),
        })
    ).nullish()
})