export type cartProps = (
    {
        id: number,
        userId: number,
        createdAt: Date,
        updateddAt: Date,
    } & 
    {
        cartProducts?: {
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
        }[]
    }
);

export interface cartProductsProps {
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
}