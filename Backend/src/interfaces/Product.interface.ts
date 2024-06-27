export interface DbProducts {
    id: number,
    image: string[],
    name: string,
    price: number,
    desc: string[],
    stock: number
}

export interface requestProduct {
    name: string,
    image: File[],
    price: string,
    desc: string[],
    stock: number,
    category: string,
    subCategory: string
}

export interface deleteProduct {
    productId: number
}

export type productProps = ( 
    DbProducts & {
        categories?: {
            id: number,
            name: string,
        };
        } & {
        subCategories?: {
            id: number,
            name: string,
            categoryId: number,
        };
        }
        & {
        comment?: {
            id: number,
            text: string,
            user: {
                id: number,
                name: string,
                image: string | null,
            };
        }[];
    }
);

// interface commentData { 
//     id: number,
//     text: string,
//     user: {
//       id: number, 
//       name: string, 
//       image?: Buffer, 
//     }
// }


export interface productsUseCasesProps {
    registerProduct: (data: Omit<requestProduct, 'image'>, filesName: string[]) => Promise<{ product: productProps, message: string } | null>;
    deleteProduct: (data: deleteProduct) => Promise<{ message: string } | undefined>
    getUniqueProduct: (productId: number) => Promise<{ product: productProps }  | null | undefined>
    getAllProducts: (perPage: number, category: string, subcategory?: string, brand?: string, pageIndex?: number, query?: string) => Promise<{ products: productProps[] | [], quantity: number | undefined } | null | undefined>
}
