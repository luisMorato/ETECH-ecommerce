import { z } from "zod";

export const categorySchema = z.object({
    id: z.number().int(),
    name: z.string(),
    subCategories: z.array(z.object({
        name: z.string(),
        categoryId: z.number().int()
    }))
});