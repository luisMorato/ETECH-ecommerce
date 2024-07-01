import { db } from "../lib/db/db";

import { 
    orderUseCasesProps, 
    updateOrderData
} from "../interfaces/Order.interface";
import { CartUseCases } from "./CartUseCases";
import { Order } from "../entities/Order";
import { queryData } from "../interfaces/Order.interface";

import { BadRequest } from "../_errors/BadRequest";
import { Unauthorized } from "../_errors/Unauthorized";
import { NotFound } from "../_errors/NotFound";

const cartUseCases = new CartUseCases();

export class OrderUseCases implements orderUseCasesProps {
    createOrder = async ( userId: number ) => {
        //ToDo: Fix the Error that is Creating 2 Orders At same time
        const cart = await cartUseCases.getUniqueCartByUserId(userId);

        if(!cart) {
            throw new NotFound("Cart Is Empty");
        }

        const { id: cartId } = cart;
        
        const cartProducts = await db?.cartProducts.findMany({
            where: {
                cartId
            },
        });

        if(!cartProducts){
            throw new BadRequest("Cart Is Empty");
        }

        const dbOrder = await db?.order.create({
            data: {
                cartId,
                paymentMethod: '',
                orderDetails: {
                    create: {
                        orderProduct: {
                            createMany: {
                                data: cartProducts.map((cartProduct) => ({
                                    productId: cartProduct.productId,
                                    quantity: Number(cartProduct.quantity),
                                })),
                            }
                        }
                    }
                }
            },
            include: {
                orderDetails: {
                    select: {
                        orderProduct: {
                            select: {
                                quantity: true,
                                products: {
                                    select: {
                                        id: true,
                                        name: true,
                                        image: true,
                                        price: true,
                                        desc: true,
                                        stock: true,
                                    },
                                },
                            },
                        },
                    }
                }
            }
        });

        if(!dbOrder){
            throw new Error('Something Went Wrong');
        }

        const completeOrder = new Order(dbOrder);

        return { order: completeOrder.getProps, message: "Order Created Successfully!" };
    }

    getUserOrders = async (userId: number) => {
        const cart = await cartUseCases.getUniqueCartByUserId(userId);

        if(cart){
            const { id: cartId } = cart;

            const orders = await db?.order.findMany({
                where: {
                    cartId: cartId
                },
                include: {
                    orderDetails: {
                        select: {
                            orderProduct: {
                                select: {
                                    quantity: true,
                                    products: {
                                        select: {
                                            id: true,
                                            name: true,
                                            image: true,
                                            price: true,
                                            desc: true,
                                            stock: true,
                                        },
                                    },
                                },
                            },
                        }
                    }
                }
            });

            if(orders){
                const completeOrders = orders.map((order) => new Order(order).getProps);

                return { completeOrders, message: "Order Found!" }
            }

            throw new BadRequest("Order Not Found!");
        }
    }

    getAllOrders = async (data: queryData) => {
        const { query } = data;

        try {
            const quantity = await db?.order.count();

            const dbOrders = await db?.order.findMany({
                where: query ? {
                    id: Number(query)
                }: {},
                include: {
                    cart: {
                        select: {
                            user: {
                                select: {
                                    name: true,
                                    email: true,
                                }
                            }
                        }
                    }
                }
            });

            if(dbOrders){
                const orders = dbOrders.map((order) => new Order(order).getProps);

                return {orders: orders || [], quantity: query ? orders.length : quantity}
            }
        } catch (error) {
            console.log('Error: ', error);
        }
    }

    updateOrder = async ({ orderId, paymentMethod, number, expiration, cardCode }: updateOrderData) => {
        try {
            if(paymentMethod === "Credit Card"){
                const creditCard = await db?.creditCard.findFirst({
                    where: {
                        number
                    }
                });

                if(!creditCard){
                    throw new Unauthorized("You Don't Have Credit Card Registered");
                }

                if(cardCode !== creditCard.cardCode){
                    throw new Unauthorized("Incorrect Card Code");
                }

                const update = await db?.order.update({
                    where: {
                        id: orderId
                    },
                    data: {
                        status: "Payment Made",
                        paymentMethod: paymentMethod,
                    }
                });

                if(update){
                    return { message: "Order Updated" };
                }
            }

            const update = await db?.order.update({
                where: {
                    id: orderId
                },
                data: {
                    status: "Payment Made",
                    paymentMethod: paymentMethod
                }
            });

            if(update){
                return { message: "Order Updated" };
            }

            throw new Error("Something Went Wrong");
        } catch (error) {
            console.log('Error: ', error);   
        }
    }
}