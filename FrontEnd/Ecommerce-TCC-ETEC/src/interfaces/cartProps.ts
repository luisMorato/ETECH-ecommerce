export type cartProps = (
    {
        id: number,
        userId: number,
    } & 
    {
        cartProducts?: {
            quantity: number,
            products: {
                id: number,
                name: string,
                image: string[],
                price: number,
                desc: string[],
                stock: number,
            }
        }[]
    }
);

export interface cartProductsProps {
    quantity: number,
    products: {
        id: number,
        name: string,
        image: string[],
        price: number,
        desc: string[],
        stock: number,
    }
}