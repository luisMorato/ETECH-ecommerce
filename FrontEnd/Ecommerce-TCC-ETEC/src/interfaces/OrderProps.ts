interface dbOrderProps {
    id: number,
    cartId: number,
    date: Date,
    status: string,
    trackingCode: string,
    paymentMethod: string,
    createdAt: Date,
    updateddAt: Date,
}

export type completeOrderProps = ({
    orderDetails: {
        orderProduct: {
            quantity: number,
            products: {
                id: number,
                name: string,
                images: string[],
                price: number,
                desc: string[],
                stock: number,
                //freight: number,
                createdAt: Date,
            },
            createdAt: Date,
            updateddAt: Date,
        }[],
    },
    cart?: {
        user: {
            name: string,
            email: string,
        },
    },
} & dbOrderProps)