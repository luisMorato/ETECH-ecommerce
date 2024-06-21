import { db } from "../lib/db/db";

import { orderUseCasesProps } from "../interfaces/Order.interface";
import { CartUseCases } from "./CartUseCases";
import { Order } from "../entities/Order";
import { queryData } from "../interfaces/Order.interface";
import { BadRequest } from "../_errors/BadRequest";

const cartUseCases = new CartUseCases();

export class OrderUseCases implements orderUseCasesProps {
    createOrder = async ( userId: number ) => {
        const cart = await cartUseCases.getUniqueCartByUserId(userId);

        if(cart) {
            const { id: cartId } = cart;

            //Check If Order Already Exists before create a new one
            const existingOrder = await db?.order.findFirst({
                where: {
                    cartId
                },
                include: {
                    orderDetails: {
                        select: {
                            cartProducts: {
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
                        },
                    },
                }
            });

            if(existingOrder){
                const simplifiedOrder = new Order(existingOrder);
                
                return { order: simplifiedOrder.getProps, message: 'Order Already Exists' };
            }

            const order = await db?.order.create({
                data: {
                    cartId,
                },
            });

            if(order){
                const orderDetail = await db?.orderDetail.create({
                    data: {
                        orderId: order.id
                    }
                });

                const cartProductsUpdate = await db?.cartProducts.updateMany({
                    where: {
                        cartId
                    },
                    data: {
                        orderDetailId: orderDetail?.id
                    }
                });

                if(orderDetail && cartProductsUpdate){
                    const simplifiedOrder = new Order(order);

                    return { order: simplifiedOrder.getProps, message: "Order Created Successfully!" };
                }
            }
        }
    }

    getUserOrder = async (userId: number) => {
        const cart = await cartUseCases.getUniqueCartByUserId(userId);

        if(cart){
            const { id: cartId } = cart;

            const order = await db?.order.findFirst({
                where: {
                    cartId: cartId
                },
            });

            const orderDetail = await db?.orderDetail.findFirst({
                where: {
                    orderId: order?.id
                }
            });

            const orderAndOrderDetails = await db?.order.findUnique({
                where: {
                    id: order?.id
                },
                include: {
                    orderDetails: {
                        where: {
                            id: orderDetail?.id
                        },
                        select: {
                            cartProducts: {
                                where: {
                                    orderDetailId: orderDetail?.id
                                },
                                select: {
                                    products: true,
                                    quantity: true
                                }
                            }
                        }
                    }
                }
            });

            if(orderAndOrderDetails){
                const completeOrder = new Order(orderAndOrderDetails);

                return { completeOrder: completeOrder.getProps, message: "Order Found!" }
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

    updateOrder = async (orderId: number) => {
        try {
            const update = await db?.order.updateMany({
                where: {
                    id: orderId
                },
                data: {
                    status: "Payment Made",
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