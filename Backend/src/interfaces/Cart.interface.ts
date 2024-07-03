export interface dbCartProps {
    id: number,
    userId: number,
    createdAt: Date,
    updateddAt: Date,
}

export interface requestCartProps {
    userId: number,
    quantity: number,
    productId: number
}

export type cartProps = (
    dbCartProps & 
    {
        cartProducts?: {
            quantity: number | null,
            products: {
                id: number,
                name: string,
                images: string[],
                price: number,
                desc: string[],
                stock: number,
                brand: string,
                createdAt: Date,
            };
            createdAt: Date,
            updateddAt: Date,
        }[];
    }
);

type addCartProps = (
    {
        add: {
            id: number,
            cartId: number,
            productId: number,
            orderDetailId: number | null,
            quantity: number | null,
        } | undefined,
        message: string
    } |
    {
        updatedCart?: cartProps,
        message: string
    } |
    {
        createdCart?: cartProps,
        message: string
    }
)

export interface cartUseCasesProps {
    AddCartProduct: ({ quantity, productId, userId }: requestCartProps) => Promise<addCartProps | undefined>,
    subtractCartProduct: ({ quantity, productId, userId }: requestCartProps) => Promise<{ message: string } | undefined>,
    removeProduct: (productId: number, userId: number) => void,
    getUniqueCartByUserId: (userId: number) => Promise<cartProps | null | undefined>,
    getuniqueCartById: (cartId: number) => Promise<cartProps | null | undefined>,
    deleteCartProducts: (userId: number) => Promise<{ message: string } | undefined>
}