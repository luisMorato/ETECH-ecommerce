import { z } from "zod";
import { zfd } from "zod-form-data";

export const loginUserSchema = z.object({
    email: z.string().min(1),
    password: z.string().min(1),
});

export const requestUserSchema = z.object({
    name: z.string().min(1),
    email: z.string().min(1),
    password: z.string().min(6),
});

export const editUserSchema = zfd.formData({
    name: z.string(),
    email: z.string(),
    image: zfd.file().optional(),
    password: z.string(),
    newPassword: z.string().optional(),
    phoneNumber: z.string().optional(),
    address: z.string().optional(),
    houseNumber: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    postalCode: z.string().optional(),
});

export const completeUserSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    image: z.string().nullable(),
    password: z.string(),
    role: z.string(),
    phoneNumber: z.string().nullable(),
    address: z.string().nullable(),
    houseNumber: z.number().nullable(),
    city: z.string().nullable(),
    state: z.string().nullable(),
    country: z.string().nullable(),
    postalCode: z.string().nullable(),
    creditCard: z.object({
        number: z.string(),
        bank: z.string(),
        expiresAt: z.string(),
        cardCode: z.string()
    }).nullish()
}).nullish();

export const userSchema = z.object({
    name: z.string(),
    email: z.string(),
    image: z.string().nullable(),
    password: z.string(),
    role: z.string(),
    phoneNumber: z.string().nullable(),
    address: z.string().nullable(),
    houseNumber: z.number().nullable(),
    city: z.string().nullable(),
    state: z.string().nullable(),
    country: z.string().nullable(),
    postalCode: z.string().nullable()
}).nullish();