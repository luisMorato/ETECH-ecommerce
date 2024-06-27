import { FastifyInstance } from "fastify";
import { z } from "zod";
import Jwt from "jsonwebtoken";

import { authentication } from "../middlewares/auth";
import { getToken } from "../utils/getToken";

import { CreditCardUseCases } from "../useCases/CreditCardUseCases";
import { creditCardRequest, creditCardSchema } from "../schemas/creditCardSchema";

type JwtPayload = {
    userId: number
}

const creditCardUseCases = new CreditCardUseCases();

export const CreditCardRoutes = async (app: FastifyInstance) => {
    app.post('/', {
        preHandler: authentication,
        schema: {
            body: z.object({
                number: z.string(),
                bank: z.string(),
                expiresAt: z.string(),
                cardCode: z.string(),
            }),
            response: {
                200: z.object({
                    creditCard: creditCardSchema,
                    message: z.string()
                })
            }
        }
    }, async (req, reply) => {
        const { number, bank, expiresAt, cardCode } = creditCardRequest.parse(req.body);
        const token = await getToken(req);
        
        if(token){
            const { userId } = Jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload;

            const add = await creditCardUseCases.addCreditCard({ number, bank, expiresAt, cardCode, userId });

            if(add){
                const { creditCard, message } = add;

                return reply.send({ creditCard, message });
            }
        }

    });
}