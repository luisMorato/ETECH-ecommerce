import { z } from "zod";

export const commentSchema = z.object({
    id: z.number(),
    productId: z.number(),
    userId: z.number(),
    text: z.string(),
}).nullish();