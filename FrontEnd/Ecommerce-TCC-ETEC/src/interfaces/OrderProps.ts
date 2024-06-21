interface dbOrderProps {
    id: number,
    cartId: number,
    date: Date,
    status: string,
    trackingCode: string,
}

export type completeOrderProps = ({
    orderDetails: {
        cartProducts: {
            quantity: number,
            products: {
                id: number,
                name: string,
                image: string[],
                price: number,
                desc: string[],
                stock: number,
            },
        }[],
    },
    cart?: {
        user: {
            name: string,
            email: string,
        },
    },
} & dbOrderProps)