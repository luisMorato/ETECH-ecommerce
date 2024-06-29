import { FastifyInstance } from "fastify";
import { MultipartFile } from "@fastify/multipart";
import { Request, Response } from "express";
import path from "path";
import fs from "fs";

import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from "zod";
import Jwt from "jsonwebtoken";

//Middlewares
import { authentication } from "../middlewares/auth";
import { imageUpload } from "../middlewares/imageUpload";

//Utils
import { getToken } from "../utils/getToken";

//Classes
import { UserUseCases } from "../useCases/UserUseCases";

//types & schemas
import { 
    userSchema, 
    requestUserSchema,
    loginUserSchema,
    editUserSchema,
    completeUserSchema
} from "../schemas/userSchemas";
import { editUser, queryData } from "../interfaces/User.interface";
import { Forbidden } from "../_errors/Fobidden";
type JwtPayload = {
    userId: number
}

//Instances
const userUseCases = new UserUseCases();

//Routes
export const userRoutes = async (app: FastifyInstance) => {
    app.addHook("preHandler", (req, reply, done) => {
        try {
            const multerSingle = imageUpload.single("image");
            multerSingle(req.raw as Request, reply.raw as Response, done);
        } catch (error: any) {
            console.log("Error: ", error);
        }
    });
    
    app
    .withTypeProvider<ZodTypeProvider>()
    .post('/', {
        schema: {
            body: requestUserSchema,
            response: {
                201: z.object({
                    user: userSchema,
                    message: z.string(),
                }),
            },
        }
    }, async (req, reply) => {
        const data = req.body;

        const res = await userUseCases.createUser(data);

        if(res?.user){
            const { user, message } = res;

            return reply.code(201).send({ user, message });
        }
    });

    app
    .withTypeProvider<ZodTypeProvider>()
    .post('/login', {
        schema: {
            body: loginUserSchema,
            response: {
                200: z.object({
                    token: z.string(),
                    message: z.string()
                }),
            }
        }
    }, async (req, reply) => {
        const { email, password } = req.body;

        const response = await userUseCases.signInUser({ email, password });

        if(response.token){
            const { token, message } = response;
            
            return reply.send({ token, message });
        }
    });

    app
    .withTypeProvider<ZodTypeProvider>()
    .get('/', {
        preHandler: authentication,
        schema: {
            response: {
                200: z.object({
                    user: completeUserSchema,
                    //imageBuffer: z.instanceof(Buffer).optional()
                }),
            }
        }
    }, async (req, reply) => {
        const token = await getToken(req);

        if(token){
            const { userId } = Jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload;

            const user = await userUseCases.getUniqueUser(userId);

            // let imagePath = '';
            // let imageBuffer;

            // if(user?.image){
            //     imagePath = path.join(
            //         process.cwd(),
            //         "public/images/user",
            //         user.image
            //     );
            //     imageBuffer = fs.readFileSync(imagePath);
            // }

            if(user){
                //return reply.code(200).send({ user, imageBuffer });
                return reply.code(200).send({ user });
            }
        }
    });

    app
    .withTypeProvider<ZodTypeProvider>()
    .put<{ Body: z.infer<typeof editUserSchema> }>('/', {
        preHandler: authentication,
        schema: {
            response: {
                200: z.object({
                    updatedUser: userSchema,
                    message: z.string()
                }),
            }
        },
    }, async (req, reply) => {
        const data  = (req.raw as any).body;
        const token = await getToken(req);
        const file: MultipartFile = (req.raw as any).file;

        if(token){
            const { userId } = Jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload;
            const res = await userUseCases.updateUser(data as editUser, userId, file?.filename);      

            if(res?.message){
                const { updatedUser, message } = res;
                return reply.send({ updatedUser, message })
            }
        }
    });

    app
    .withTypeProvider<ZodTypeProvider>()
    .delete('/', {
        preHandler: authentication,
        schema: {
            response: {
                200: z.object({
                    user: userSchema,
                    message: z.string()
                }).nullable(),
            }
        }
    }, async (req, reply) => {
        const token = await getToken(req);

        if(token){
            const { userId } = Jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload;

            const deleted = await userUseCases.deleteUser(userId);

            if(deleted?.user){
                const { user, message } = deleted;

                return reply.code(200).send({ user, message });
            }
        }
    });

    app
    .withTypeProvider<ZodTypeProvider>()
    .get('/all', {
        preHandler: authentication,
        schema: {
            querystring: z.object({
                pageIndex: z.string().transform((val) => parseInt(val)).optional(),
                perPage: z.string().transform((val) => parseInt(val)).optional(),
                search: z.string().optional()
            }),
            response: {
                200: z.object({
                    users: z.array(completeUserSchema),
                    quantity: z.number().int().nullish(),
                }),
            }
        }
    }, async (req, reply) => {
        const token = await getToken(req);

        if(token){
            const { userId } = Jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload;

            const user = await userUseCases.getUniqueUser(userId);

            if(user?.role !== "ADMIN"){
                throw new Forbidden("User Don't Have Permission");
            }

            const data = req.query;

            const res = await userUseCases.getAllUsers(data as queryData);

            if(res){
                const { users, quantity } = res;
                return reply.code(200).send({ users, quantity });
            }
        }
    });
}