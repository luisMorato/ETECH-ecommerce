export interface DbProducts {
    id: number,
    name: string,
    price: number,
    images: File[],
    desc: string[],
    stock: number,
    brand: string,
    category: string,
    subCategory: string,
    //freight: number,
    createdAt: Date,
}

export type productProps = ( 
    DbProducts & {
        categories?: {
            name: string;
        };
        } & {
        subCategories?: {
            name: string,
        };
        } & {
        comment?: {
            id: number,
            text: string,
            user: {
                id: number,
                name: string,
                image: string
            },
            createdAt: Date,
        }[],
    }
);