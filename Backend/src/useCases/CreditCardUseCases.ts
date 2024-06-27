import { db } from "../lib/db/db";

import { requestCreditCardData } from "../interfaces/CreditCard.interface";
import { CreditCard } from "../entities/CreditCard";
import { BadRequest } from "../_errors/BadRequest";

export class CreditCardUseCases {
    addCreditCard = async ({ number, bank, expiresAt, cardCode, userId }: requestCreditCardData) => {
        const existingCreditCard = await db?.creditCard.findFirst({
            where: {
                userId
            }
        });

        if(existingCreditCard){
            const update = await db?.creditCard.update({
                where: {
                    id: existingCreditCard.id
                },
                data: {
                    number,
                    bank,
                    expiresAt,
                    cardCode,
                },
            });

            if(update){
                const creditCard = new CreditCard(update);
                return { creditCard: creditCard.getCreditCardProps, message: "Credit Card Updated" };
            }
        }

        const dbCreditCard = await db?.creditCard.create({
            data: {
                userId,
                number,
                bank,
                expiresAt,
                cardCode,
            },
        });

        if(dbCreditCard){
            const creditCard = new CreditCard(dbCreditCard);
            return { creditCard: creditCard.getCreditCardProps, message: "Credit Card Added" };
        }

        throw new Error('Something Went Wrong');
    }

    deleteCreditCard = async (number: string, userId: number) => {
        const existingCreditCard = await db?.creditCard.findFirst({
            where: {
                number,
                AND: {
                    userId
                }
            }
        });

        if(!existingCreditCard){
            throw new BadRequest("Credit Card Not Found");
        }

        const del = await db?.creditCard.deleteMany({
            where: {
                number,
                AND: {
                    userId
                }
            }
        });

        if(del){
            return { message: "Credit Card Deleted" };
        }
    }
}