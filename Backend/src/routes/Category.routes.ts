import { FastifyInstance } from "fastify";

import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

//middlewares

//utils

//Classes
import { CategoryUseCases } from "../useCases/CategoryUseCases";

//Types & Schemas
import { categorySchema } from "../schemas/categorySchema";

//Instances
const categoryUseCases = new CategoryUseCases();

export const CategoryRoutes = async (app: FastifyInstance) => {
    //ToDo: check if user role is ADMIN before allow user to add a new category
    app
    .withTypeProvider<ZodTypeProvider>()
    .post('/', {
        schema: {
            body: z.object({
                name: z.string().min(1)
            }),
            response: {
                201: z.object({
                    add: categorySchema.nullish(),
                    message: z.string()
                }),
                400: z.object({
                    message: z.string().nullish()
                })
            }
        }
    }, async (req, reply) => {
        const { name } = req.body;

        const create = await categoryUseCases.AddCategory(name);

        if(create?.add) {
            const { add, message } = create;
            return reply.code(201).send({ add, message });
        }

        return reply.code(400).send({ message: create?.message });
    });

    //ToDo: check if user role is ADMIN before allow user to delete a category
    app
    .withTypeProvider<ZodTypeProvider>()
    .delete('/', {
        schema: {
            body: z.object({
                categoryId: z.number().int()
            }),
            response: {
                200: z.object({
                    message: z.string(),
                }).nullish(),
            }
        }
    }, async (req, reply) => {
        const { categoryId } = req.body;

        const res = await categoryUseCases.DeleteCategory(categoryId);

        if(res) {
            const {  message } = res;
            return reply.code(200).send({ message });
        }
    });

    app
    .withTypeProvider<ZodTypeProvider>()
    .get('/', {
        schema: {
            response: {
                200: z.object({
                    categoriesandSubCategories: z.array(categorySchema).optional()
                })
            }
        }
    }, async (req, reply) => {
        const categoriesandSubCategories = await categoryUseCases.GetCategories();

        return reply.send({ categoriesandSubCategories });
    });

    app
    .withTypeProvider<ZodTypeProvider>()
    .get('/:categoryName', {
        schema: {
            params: z.object({
                categoryName: z.string()
            }),
            response: {
                200: z.object({
                    categoryAndSubCategories: categorySchema.nullish()
                })
            }
        }
    }, async (req, reply) => {
        const { categoryName } = req.params;

        const categoryAndSubCategories = await categoryUseCases.GetCategory(categoryName);

        return reply.send({ categoryAndSubCategories });
    });
}