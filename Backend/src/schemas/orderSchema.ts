import { z } from "zod";

export const simplifiedOrder = z.object({
        id: z.number().int(),
        cartId: z.number().int(),
        date: z.date(),
        status: z.string(),
        trackingCode: z.string(),
});

export const completeOrder = z.object({
    id: z.number().int(),
    cartId: z.number().int(),
    date: z.date(),
    status: z.string(),
    trackingCode: z.string(),
    orderDetails: z.object({ 
        cartProducts: z.array(z.object({
            products: z.object({
                id: z.number().int(),
                name: z.string(),
                image: z.array(z.string()),
                price: z.number(),
                desc: z.array(z.string()),
                stock: z.number().int()
              }),
              quantity: z.number().int().nullable()
        }))
    }).nullish(),
    cart: z.object({
        user: z.object({
            name: z.string(),
            email: z.string(),
        }),
    }).nullish(),
});