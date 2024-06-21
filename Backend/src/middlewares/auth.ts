import { 
    FastifyReply, 
    FastifyRequest, 
    HookHandlerDoneFunction 
} from "fastify";

import Jwt from 'jsonwebtoken';

import { getToken } from "../utils/getToken";
import { Unauthorized } from "../_errors/Unauthorized";

export const authentication = async (req: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) => {
    const { authorization } = req.headers;

    if(!authorization){
        new Unauthorized("Unathorized");
    }

    const token = await getToken(req);

    if(!token || token === ''){
        throw new Unauthorized("Unathorized");
    }

    try {
        Jwt.verify(token, process.env.SECRET_KEY!);
    } catch (error) {
        throw new Unauthorized("Invalid Token");
    }
}