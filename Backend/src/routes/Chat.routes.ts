import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export const ChatRoutes = async (app: FastifyInstance) => {
    app
    .withTypeProvider<ZodTypeProvider>()
    .post('/', {
        schema: {
            body: z.object({
                text: z.string()
            }),
            response: z.object({
                200: z.object({

                })
            })
        }
    }, (req, reply) => {
        const { text } = req.body;

        
    });
}