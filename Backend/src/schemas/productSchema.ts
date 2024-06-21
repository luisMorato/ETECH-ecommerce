import { z } from "zod";
import { zfd } from "zod-form-data";

export const requestProductData = zfd.formData({
    name: z.string().min(1).max(80),
    image: z.array(zfd.file()),
    price: z.string(),
    desc: z.array(z.string().min(1)),
    stock: z.string().transform((val) => parseInt(val)),
    category: z.string().min(1),
    subCategory: z.string().min(1),
});

export const productSchema = z.object({
    id: z.number().int(),
    name: z.string(),
    image: z.array(z.string()),
    price: z.number(),
    desc: z.array(z.string()),
    stock: z.number().int(),
    // comment: z.array(z.object({
    //     id: z.number(),
    //     text: z.string(),
    //     user: z.object({
    //         name: z.string(),
    //     })
    // })).optional(),
    categories: z.object({
        name: z.string()
    }).optional(),
    subCategories: z.object({
        name: z.string(),
        categoryId: z.number().int()
    }).optional()
})