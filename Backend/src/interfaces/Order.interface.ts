export interface dbOrderProps {
    id: number,
    cartId: number,
    date: Date,
    status: string,
    trackingCode: string,
    paymentMethod: string
}

export type completeOrderProps = ({
    orderDetails?: {
        orderProduct: {
            quantity: number,
            products: {
                id: number,
                name: string,
                image: string[],
                price: number,
                desc: string[],
                stock: number,
                brand: string,
            };
        }[];
    } | null,
    cart?: {
        user: {
            name: string,
            email: string,
        },
    },
} & dbOrderProps)

export interface queryData {
    query?: string,
}

export interface updateOrderData {
    orderId: number, 
    paymentMethod: string,
    number?: string,
    expiration?: string,
    cardCode?: string
}

export interface orderUseCasesProps {
    createOrder: (userId: number) => Promise<{order: dbOrderProps, message: string} | undefined>,
    getUserOrders: (userId: number) => Promise<{completeOrders: completeOrderProps[], message: string} | null | undefined>,
    getAllOrders: (data: queryData) => Promise<{orders: completeOrderProps[], quantity: number | undefined} | undefined>,
    updateOrder: ({ orderId, paymentMethod, number, expiration, cardCode }: updateOrderData) => Promise<{ message: string } | undefined >
}