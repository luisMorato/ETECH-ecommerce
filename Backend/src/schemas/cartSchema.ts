import { z } from "zod";

export const cartSchema = z.object({
    id: z.number().int(),
    userId: z.number().int(),
    createdAt: z.date(),
    updateddAt: z.date(),
    cartProducts: z.array(
        z.object({
            products: z.object({
                id: z.number().int(),
                name: z.string(),
                images: z.array(z.string()),
                price: z.number(),
                desc: z.array(z.string()),
                stock: z.number().int(),
                brand: z.string(),
                //freight: z.number(),
                createdAt: z.date(),
            }),
            quantity: z.number().int().nullable(),
            createdAt: z.date(),
        })
    ).nullish()
})