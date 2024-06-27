import { z } from "zod";

export const creditCardSchema = z.object({
    id: z.number().int(),
    userId: z.number().int(),
    number: z.string(),
    bank: z.string(),
    expiresAt: z.string(),
    cardCode: z.string(),
});

export const creditCardRequest = z.object({
    number: z.string(),
    bank: z.string(),
    expiresAt: z.string(),
    cardCode: z.string(),
});