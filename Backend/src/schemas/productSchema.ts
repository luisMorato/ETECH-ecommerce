import { z } from "zod";
import { zfd } from "zod-form-data";

export const requestProductData = zfd.formData({
    name: z.string().min(1).max(80),
    images: z.array(zfd.file()),
    price: z.string(),
    desc: z.array(z.string().min(1)),
    stock: z.string().transform((val) => parseInt(val)),
    brand: z.string().min(1),
    //freight: z.number(),
    category: z.string().min(1),
    subCategory: z.string().min(1),
});

export const productSchema = z.object({
    id: z.number().int(),
    name: z.string(),
    images: z.array(z.string()),
    price: z.number(),
    desc: z.array(z.string()),
    stock: z.number().int(),
    brand: z.string().min(1),
    //freight: z.number(),
    createdAt: z.date(),
    comment: z.array(z.object({
        id: z.number(),
        text: z.string(),
        user: z.object({
            id: z.number().int(),
            name: z.string(),
            image: z.string().nullable()
        })
    })).optional(),
    categories: z.object({
        id: z.number().int(),
        name: z.string()
    }).optional(),
    subCategories: z.object({
        name: z.string(),
        categoryId: z.number().int()
    }).optional()
})