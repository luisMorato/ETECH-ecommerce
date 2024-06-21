export interface dbOrderProps {
    id: number;
    cartId: number;
    date: Date;
    status: string;
    trackingCode: string;
}

export type completeOrderProps = ({
    orderDetails?: {
        cartProducts: {
            quantity: number | null,
            products: {
                id: number,
                name: string,
                image: string[],
                price: number,
                desc: string[],
                stock: number,
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

export interface orderUseCasesProps {
    createOrder: (userId: number) => Promise<{order: dbOrderProps, message: string} | null | undefined>,
    getUserOrder: (userId: number) => Promise<{completeOrder: completeOrderProps, message: string} | null | undefined>,
    getAllOrders: (data: queryData) => Promise<{orders: completeOrderProps[], quantity: number | undefined} | undefined>,
    updateOrder: (orderId: number) => Promise<{ message: string } | undefined >
}