import { z } from "zod";

export const simplifiedOrder = z.object({
        id: z.number().int(),
        cartId: z.number().int(),
        date: z.date(),
        status: z.string(),
        trackingCode: z.string(),
        createdAt: z.date(),
        updateddAt: z.date(),
});

export const completeOrder = z.object({
    id: z.number().int(),
    cartId: z.number().int(),
    date: z.date(),
    status: z.string(),
    trackingCode: z.string(),
    createdAt: z.date(),
    updateddAt: z.date(),
    orderDetails: z.object({ 
        orderProduct: z.array(z.object({
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