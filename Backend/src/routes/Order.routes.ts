import { FastifyInstance } from "fastify";

import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import Jwt from "jsonwebtoken";

//Middlewares
import { authentication } from "../middlewares/auth";

//utils
import { getToken } from "../utils/getToken";

//Classes
import { OrderUseCases } from "../useCases/OrderUseCases";
import { UserUseCases } from "../useCases/UserUseCases";

//Schemas & interfaces
import { 
    completeOrder, 
    simplifiedOrder 
} from "../schemas/orderSchema";
import { queryData } from "../interfaces/Order.interface";
import { Forbidden } from "../_errors/Fobidden";
import { Unauthorized } from "../_errors/Unauthorized";
type JwtPayload = {
    userId: number
}

//Instances
const orderUseCases = new OrderUseCases();
const userUseCases = new UserUseCases();

//Routes
export const OrderRoutes = async (app: FastifyInstance) => {
    app
    .withTypeProvider<ZodTypeProvider>()
    .post('/', {
        preHandler: authentication,
        schema: {
            response: {
                201: z.object({
                    order: completeOrder,
                    message: z.string()
                })
            }
        }
    }, async (req, reply) => {
        const token = await getToken(req);

        if(token){
            const { userId } = Jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload;

            const create = await orderUseCases.createOrder(userId);

            if(create){
                const { order, message } = create;
                return reply.code(201).send({ order, message });
            }
        }
    });

    app
    .withTypeProvider<ZodTypeProvider>()
    .get('/', {
        preHandler: authentication,
        schema: {
            response: {
                200: z.object({
                    completeOrders: z.array(completeOrder),
                    message: z.string()
                })
            }
        }
    }, async (req, reply) => {
        const token = await getToken(req);

        if(token){
            const { userId } = Jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload;

            const data = await orderUseCases.getUserOrders(userId); 

            if(data){
                const { completeOrders, message } = data;
                return reply.code(200).send({ completeOrders, message });
            }
        }
    });

    app
    .withTypeProvider<ZodTypeProvider>()
    .get('/all', {
        preHandler: authentication,
        schema: {
            querystring: z.object({
                query: z.string().transform((val) => parseInt(val)).optional()
            }),
            response: {
                200: z.object({
                    orders: z.array(completeOrder),
                    quantity: z.number().nullish()
                }),
            }
        }
    }, async (req, reply) => {
        const token = await getToken(req);

        if(token){
            const { userId } = Jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload;

            const user = await userUseCases.getUniqueUser(userId);

            if(user?.role !== 'ADMIN'){
                throw new Forbidden("User Don't Have Permission");
            }

            const data = req.query;
            const res = await orderUseCases.getAllOrders(data as queryData); 

            if(res){
                const { orders, quantity } = res;
                return reply.code(200).send({ orders, quantity });
            }
        }
    });

    app
    .withTypeProvider<ZodTypeProvider>()
    .put('/:orderId', {
        preHandler: authentication,
        schema: {
            //ToDo: Add a status Field
            body: z.object({
                paymentMethod: z.string().min(1),
                number: z.string().optional(),
                expiration: z.string().optional(),
                cardCode: z.string().optional()
            }),
            params: z.object({
                orderId: z.string().transform((val) => parseInt(val))
            }),
            response: {
                200: z.object({
                    message: z.string()
                }),
            }
        }
    }, async (req, reply) => {
        const { paymentMethod, number, expiration, cardCode } = req.body;
        const { orderId } = req.params;

        const token = await getToken(req);

        if(token){
            const { userId } = Jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload;

            const user = await userUseCases.getUniqueUser(userId);

            if(!user){
                throw new Unauthorized("User Not Found");
            }

            const update = await orderUseCases.updateOrder({orderId, paymentMethod, number, expiration, cardCode});

            if(update?.message){
                const { message } = update;

                return reply.send({ message });
            }
        }
    });

    //ToDo: Create a route handler to Delete an order
}