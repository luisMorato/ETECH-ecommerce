import { FastifyInstance } from "fastify";
import Jwt from "jsonwebtoken";

import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

//Middleware
import { authentication } from "../middlewares/auth";

//utils
import { getToken } from "../utils/getToken";

//Types & Schemas
import { commentSchema } from "../schemas/commentSchema";
type JwtPayload = {
    userId: number
}

//Classes
import { CommentsUseCases } from "../useCases/ComentUseCases";

//Instances
const commentsUseCases = new CommentsUseCases();

export const commentsRoutes = async (app: FastifyInstance) => {
    app
    .withTypeProvider<ZodTypeProvider>()
    .post('/:productId', {
        preHandler: authentication,
        schema: {
            body: z.object({
                text: z.string().min(1)
            }),
            params: z.object({
                productId: z.string().transform((val) => parseInt(val))
            }),
            response: {
                201: z.object({
                    comment: commentSchema,
                    message: z.string()
                }),
            }
        }
    }, async (req, reply) => {
        const { text } = req.body;
        const { productId } = req.params;

        const token = await getToken(req);
    
        if(token){
            const { userId } = Jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload;
            
            const comment = await commentsUseCases.createComment({ productId, userId, text });

            if(comment) {
                return reply.code(201).send({comment, message: "Comment Posted!"});
            }

            throw new Error("Error Posting the Comment");
        }
    });
}