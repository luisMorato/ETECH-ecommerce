import { FastifyInstance } from "fastify";

import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import Jwt from "jsonwebtoken";

//middleware
import { authentication } from "../middlewares/auth";
import { IsAdmin } from "../middlewares/IsAdmin";

//utils

//Classes
import { CartUseCases } from "../useCases/CartUseCases";

//Types & Schemas
import { cartSchema } from "../schemas/cartSchema";
import { requestCartProps } from "../interfaces/Cart.interface";
import { getToken } from "../utils/getToken";
import { BadRequest } from "../_errors/BadRequest";
import { UnprocessableEntity } from "../_errors/UnprocessableEntity";
type JwtPayload = {
    userId: number
}

//Instances
const cartUseCases = new CartUseCases();

//Routes
export const CartRoutes = async (app: FastifyInstance) => {
    app.addHook('preHandler', (req, reply, done) => {
        authentication(req, reply, done);
        IsAdmin(req, reply, done);
        done();
    });
    
    app
    .withTypeProvider<ZodTypeProvider>()
    .post('/add', {
        schema: {
            body: z.object({
                quantity: z.number().int(),
                productId: z.number().int()
            }),
            response: {
                201: z.object({
                    createdCart: cartSchema,
                    message: z.string()
                }),
                200: z.object({
                    //z.union => z.object({}) || z.object({})
                    addOrUpdate: z.union([
                        cartSchema,
                        z.object({
                            id: z.number(),
                            cartId: z.number(),
                            productId: z.number(),
                            //orderDetailId: z.number().nullable(),
                            quantity: z.number().nullable(),
                        })
                    ]),
                    message: z.string()
                }),
            }
        }
    }, async (req, reply) => {
        const data = req.body;
        const token = await getToken(req);

        const { quantity, productId } = data as Omit<requestCartProps, "userId">;

        if(token){
            const { userId } = Jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload;

            const res = await cartUseCases.AddCartProduct({ quantity, productId, userId });

            if(res?.createdCart){
                const { createdCart, message } = res;
                return reply.code(201).send({ createdCart, message });
            }

            if(res?.updatedCart){
                const { updatedCart, message } = res;
                return reply.code(200).send({ addOrUpdate: updatedCart, message });
            }

            if(res?.add){
                const { add, message } = res;
                return reply.code(200).send({ addOrUpdate: add, message });
            }
        }
    });

    app
    .withTypeProvider<ZodTypeProvider>()
    .patch('/subtract', {
        schema: {
            body: z.object({
                quantity: z.number().int(),
                productId: z.number().int()
            }),
            response: {
                200: z.object({
                    message: z.string()
                })
            }
        }
    }, async (req, reply) => {
        const { quantity, productId } = req.body;

        const token = await getToken(req);

        if(token){
            const { userId } = Jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload;

            const subtract = await cartUseCases.subtractCartProduct({ quantity, productId, userId });

            if(subtract){
                return reply.code(200).send({ message: subtract.message })
            }
        }
    });

    app
    .withTypeProvider<ZodTypeProvider>()
    .delete('/:productId', {
        schema: {
            params: z.object({
                productId: z.string().transform((val) => parseInt(val))
            }),
            response: {
                200: z.object({
                    message: z.string()
                }),
            }
        }
    }, async (req, reply) => {
        const { productId } = req.params;

        const token = await getToken(req);

        if(token){
            const { userId } = Jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload;

            const remove = await cartUseCases.removeProduct(productId, userId);
            
            if(remove){
                return reply.code(200).send({ message: remove.message });
            }

            throw new UnprocessableEntity("Cart Not Found!");
        }
    });

    app
    .withTypeProvider<ZodTypeProvider>()
    .get('/', {
        schema: {
            response: {
                200: z.object({
                    cart: cartSchema
                }),
            }
        }
    }, async (req, reply) => {
        const token = await getToken(req);

        if(token){
            const { userId } = Jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload;

            const cart = await cartUseCases.getUniqueCartByUserId(userId);

            if(cart){
                return reply.code(200).send({ cart });
            }

            throw new BadRequest("User Don't Have a Cart");
        }
    });

    //ToDo: Crate an route to Clear the Cart
    app
    .withTypeProvider<ZodTypeProvider>()
    .delete('/', {
        schema: {
            response: {
                200: z.object({
                    message: z.string()
                })
            }
        }
    }, async (req, reply) => {
        const token = await getToken(req);

        if(token){
            const { userId } = Jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload;

            const del = await cartUseCases.deleteCartProducts(userId);

            if(del){
                const { message } = del;
                return reply.send({ message })
            }
        }
    })
}