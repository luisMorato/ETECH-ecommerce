import { FastifyRequest } from "fastify";

export const getToken = async (req: FastifyRequest): Promise<string | null> => {
    const { authorization } = req.headers;

    const token = authorization?.split(" ")[1];

    return token || null;
}