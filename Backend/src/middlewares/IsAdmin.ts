import { 
    FastifyReply, 
    FastifyRequest, 
    HookHandlerDoneFunction
} from "fastify";

import Jwt from "jsonwebtoken";

import { UserUseCases } from "../useCases/UserUseCases";
import { getToken } from "../utils/getToken";

import { Forbidden } from "../_errors/Fobidden";

const userUseCases = new UserUseCases();

type JwtPayload = {
    userId: number
}

export const IsAdmin = async (req: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) => {
    const token = await getToken(req);

    if(token){
        const { userId } = Jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload;

        const user = await userUseCases.getUniqueUser(userId);

        if(user?.role === 'ADMIN'){
            done(new Forbidden("Admin is not allowed"));
        }
    }
}