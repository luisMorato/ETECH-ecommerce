import { BadRequest } from "../_errors/BadRequest";
import { Cart } from "../entities/Cart";
import {
    requestCartProps, 
    cartUseCasesProps,
} from "../interfaces/Cart.interface";

import { db } from "../lib/db/db";
import { UserUseCases } from "./UserUseCases";

const userUseCases = new UserUseCases();

export class CartUseCases implements cartUseCasesProps {
    AddCartProduct = async ({ quantity, productId, userId }: requestCartProps) => {
        try {
            const existingUser = await userUseCases.getUniqueUser(userId);

            if(!existingUser){
                throw new BadRequest("User Not Found!");
            }

            const existingCart = await this.getUniqueCartByUserId(userId);

            if(existingCart){
                const { id: cartId } = existingCart;

                //ToDo: Check if the product is registered in the table product before continue
                const existingCartProduct = await db?.cart.findUnique({
                    where: {
                        id: cartId,
                    },
                    select: {
                        cartProducts: {
                            where: {
                                productId
                            }
                        }
                    }
                });

                const cartProduct = existingCartProduct?.cartProducts.map((cartProduct) => cartProduct);

                if(cartProduct?.length === 0){
                    const add = await db?.cartProducts.create({
                        data: {
                            cartId: cartId,
                            productId,
                            quantity: quantity || 1,
                        }
                    });

                    return {add, message: "Product Added Successfully!"};
                }
        
                const update = await db?.cart.update({
                    where: {
                        id: cartId
                    },
                    data: {
                        cartProducts: {
                            updateMany: {
                                where: {
                                    productId
                                },
                                data: {
                                    quantity: {
                                        increment: quantity || 1
                                    }
                                }
                            }
                        }
                    }
                });

                if(update){
                    const updatedCart = new Cart(update);

                    return { updatedCart: updatedCart.getProps, message: "Quantity Updated Successfully!" };
                }
            }

            const create = await db?.cart.create({
                data: {
                    userId,
                    cartProducts: {
                        create: {
                            quantity,
                            productId,
                        }
                    }
                },
            });

            if(create){
                const createdCart = new Cart(create);

                return { createdCart: createdCart.getProps, message: "Product Added Successfully!" };
            }

            throw new Error("Something Went Wrong!");
        } catch (error) {
            console.log('error: ', error);
        }
    }

    subtractCartProduct = async ({ quantity, productId, userId }: requestCartProps) => {
        const existingCart = await this.getUniqueCartByUserId(userId);

        if(existingCart){
            const { id: cartId } = existingCart;

            const existingCartProduct = await db?.cart.findUnique({
                where: {
                    id: cartId,
                },
                select: {
                    cartProducts: {
                        where: {
                            productId
                        }
                    }
                }
            });
    
            if(existingCartProduct?.cartProducts){
                const productQuantity = existingCartProduct?.cartProducts.map((cartProduct) => cartProduct.quantity);

                if(productQuantity && (productQuantity[0]! < 1 || productQuantity[0]! <= quantity)){
                    const del = await this.removeProduct(productId, cartId);

                    if(del){
                        const { message } = del;

                        return { message }
                    }
                }

                try {
                    const subtract = await db?.cartProducts.updateMany({
                        where: {
                            productId
                        },
                        data: {
                            cartId,
                            productId,
                            quantity: {
                                decrement: quantity
                            }
                        }
                    });

                    if(subtract){
                        return { message: "Quantity Updated Successfully!" };
                    }
                } catch (error) {
                    console.log('error: ', error);
                }
            }
        }
    }

    removeProduct = async (productId: number, userId: number) => {
        try {
            const existingCart = await this.getUniqueCartByUserId(userId);

            if(!existingCart){
                return null;
            }

            const remove = await db?.cartProducts.deleteMany({
                where: {
                    productId,
                    AND: {
                        cart: {
                            userId
                        }
                    }
                }
            });

            if(remove){
                return { message: "Product Removed Successfully" }
            }
        } catch (error) {
            console.log('error: ', error);
        }
    }

    getUniqueCartByUserId = async (userId: number) => {
        try {
            const existingCart = await db?.cart.findFirst({
                where: {
                    userId
                },
                include: {
                    cartProducts: {
                        select: {
                            products: true,
                            quantity: true, 
                        }
                    }
                }
            });

            if(existingCart){
                const cart = new Cart(existingCart);

                return cart.getProps || null;
            }
        } catch (error) {
            console.log('error: ', error);
        }
    }

    getuniqueCartById = async (cartId: number) => {
        try {
            const existingCart = await db?.cart.findUnique({
                where: {
                    id: cartId
                }
            });

            if(existingCart){
                const cart = new Cart(existingCart);

                return cart.getProps || null;
            }
        } catch (error) {
            console.log('error: ', error);
        }
    }

    deleteCartProcuts = async (userId: number) => {
        const cart = await this.getUniqueCartByUserId(userId);

        if(!cart){
            throw new BadRequest("Cart Not Found");
        }

        const del = await db?.cart.update({
            where: {
                id: cart.id
            },
            data: {
                cartProducts: {
                    set: []
                }
            }
        });

        if(del){
            return { message: "Cart Emptied" };
        }
    }
}