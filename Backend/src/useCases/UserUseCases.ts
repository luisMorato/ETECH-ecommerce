import Jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import path from 'path';
import fs from 'fs';

import { db } from "../lib/db/db";

import { 
    editUser,
    queryData,
    requestUserProps,
    userUseCasesProps 
} from "../interfaces/User.interface";
import { User } from '../entities/User';
import { Conflict } from '../_errors/Conflict';
import { BadRequest } from '../_errors/BadRequest';
import { Unauthorized } from '../_errors/Unauthorized';

export class UserUseCases implements userUseCasesProps {
    createUser = async (props: requestUserProps) => {
        try {
            const {
                name,
                email,
                password
            } = props;

            const existingUser = await this.getUserbyEmail(email);

            if(existingUser) {
                throw new Conflict("Email Already Taken");
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const create = await db?.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    role: "USER"
                }
            });

            if(create){
                const user = new User(create);
                
                return { user: user.getUserData, message: "Created Successfully!" };
            }

        } catch (error) {
            console.log('error: ', error);
        }
    }

    updateUser = async (data: editUser, userId: number, fileName?: string) => {
        let { 
            name, 
            email,
            password,
            newPassword,
            phoneNumber,
            address,
            houseNumber,
            city,
            state, 
            country,
            postalCode,
         } = data;

        const existingUser = await this.getUniqueUser(userId);

        if(!existingUser){
            throw new BadRequest("User Not Found");
        }

        if(!password){
            throw new BadRequest("Password is Required");
        }

        const passwordMatch = await bcrypt.compare(password, existingUser.password);

        if(!passwordMatch){
            throw new Unauthorized("Wrong Password");
        }

        const existingUserEmail = await this.getUserbyEmail(email);

        if(existingUserEmail && existingUserEmail.email !== existingUser.email){
            throw new Conflict("Email Already Taken");
        }

        if(fileName && existingUser.image){
            const imagesPath =  path.join(process.cwd(), "public/images/user",existingUser.image);
            fs.unlink(imagesPath, (error) => {
                console.log(error);
            });
        }

        if(password && newPassword && newPassword !== ''){
            if(password === newPassword){
                throw new BadRequest("The Password is the Same as New Password");
            }

            const hashedNewPassword = await bcrypt.hash(newPassword, 10);

            newPassword = undefined;

            const update = await db?.user.update({
                where: {
                    id: existingUser.id
                },
                data: {
                    name, 
                    email,
                    image: fileName ? fileName : existingUser.image ? existingUser.image : null,
                    password: hashedNewPassword,
                    phoneNumber,
                    address,
                    houseNumber: houseNumber ? parseInt(houseNumber) : null,
                    city,
                    state,
                    country,
                    postalCode,
                }
            });

            if(update){
                const updatedUser = new User(update);

                return { updatedUser: updatedUser.getUserData, message: "Account Updated" }
            }
        }

        const update = await db?.user.update({
            where: {
                id: existingUser.id
            },
            data: {
                name, 
                email,
                image: fileName ? fileName : existingUser.image ? existingUser.image : null,
                phoneNumber,
                address,
                houseNumber: houseNumber ? parseInt(houseNumber) : null,
                city,
                state,
                country,
                postalCode
            }
        });

        if(update){
            const updatedUser = new User(update);

            return { updatedUser: updatedUser.getUserData, message: "Account Updated" }
        }
    }

    deleteUser = async (userId: number) => {
        const existingUser = await this.getUniqueUser(userId);

        if(!existingUser) {
            throw new BadRequest("User not Found");
        }

        try {
            const deletedUser = await db?.user.delete({
                where: {
                    id: userId
                }
            });
    
            if(deletedUser){
                const user = new User(deletedUser);

                return { user: user.getUserData, message: "User Deleted!" } || null;
            }

        } catch (error) {
            console.log('error: ', error);
            return null;
        }
    }

    getUniqueUser = async (userId: number) => {
        try {
            const dbUser = await db?.user.findUnique({
                where: {
                    id: userId
                },
                include: {
                    creditCard: {
                        select: {
                            number: true,
                            bank: true,
                            expiresAt: true,
                            cardCode: true,
                        }
                    }
                }
            });

            if(dbUser) {
                const user = new User(dbUser);

                return user.getUserData || null;
            }
        } catch (error) {
            console.log('error: ', error);
            return null;
        }
    }

    getUserbyEmail = async (email: string) => {
        try {
            const dbUser = await db?.user.findFirst({
                where: {
                    email
                },
                include: {
                    creditCard: {
                        select: {
                            number: true,
                            bank: true,
                            expiresAt: true,
                            cardCode: true,
                        }
                    }
                }
            });
    
            if(dbUser) {
                const user = new User(dbUser);

                return user.getUserData || null;
            }
        } catch (error) {
            console.log('error: ', error);
            return null;
        }
    }

    signInUser = async ({ email, password }: Omit<requestUserProps, "name">) => {
        const existingUser = await this.getUserbyEmail(email);

        if(!existingUser){
            throw new Unauthorized("Unauthorized");
        }

        const passwordMatch = await bcrypt.compare(password, existingUser.password);

        if(!passwordMatch){
            throw new Unauthorized("Wrong Password");
        }

        const token = await Jwt.sign({ userId: existingUser.id }, process.env.SECRET_KEY!);

        return { token, message: "Email Sent" }
    }

    getAllUsers = async (data: queryData) => {
        const { pageIndex, perPage, search } = data;

        try {
            const quantity = await db?.user.count();

            const dbUsers = await db?.user.findMany({
                where: search ? {
                    name: {
                        contains: search,
                        mode: 'insensitive'           
                    }
                } : {},
                take: Number(perPage),
                skip: Number(( pageIndex || 0 ) * perPage)
            });

            if(dbUsers){
                const users = dbUsers.map((user) => new User(user).getUserData);
                
                return {users: users || [], quantity: search ? users.length : quantity};
            }
            
        } catch (error) {
            console.log('Error: ', error);
        }
    }
}