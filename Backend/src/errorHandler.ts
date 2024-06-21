import { FastifyInstance } from "fastify"
import { ZodError } from "zod";

//Error Classes
import { BadRequest } from "./_errors/BadRequest";
import { Unauthorized } from "./_errors/Unauthorized";
import { Forbidden } from "./_errors/Fobidden";
import { UnprocessableEntity } from "./_errors/UnprocessableEntity";
import { Conflict } from "./_errors/Conflict";


type fastifyErrorHandler = FastifyInstance['errorHandler'];

export const errorHandler: fastifyErrorHandler = (error, req, reply) => {
    if(error instanceof ZodError){
        return reply.code(400).send({
            message: `Error During Validation`,
            errors: error.flatten().fieldErrors
        });
    }
    
    if(error instanceof BadRequest){
        return reply.code(400).send({ message: error.message });
    }

    if(error instanceof Conflict) {
        return reply.code(409).send({ message: error.message });
    }

    if(error instanceof Unauthorized){
        return reply.code(401).send({ message: error.message });
    }

    if(error instanceof Forbidden){
        return reply.code(403).send({ message: error.message });
    }

    if(error instanceof UnprocessableEntity){
        return reply.code(422).send({ message: error.message });
    }

    return reply.code(500).send({ message: error.message });
}