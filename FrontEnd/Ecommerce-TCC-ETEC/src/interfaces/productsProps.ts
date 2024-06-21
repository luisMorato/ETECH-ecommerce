export interface DbProducts {
    id: number,
    name: string,
    price: number,
    image: File[],
    desc: string[],
    stock: number,
    category: string,
    subCategory: string
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
        // comment?: {
        //     id: number,
        //     text: string,
        //     user: {
        //         name: string,
        //     };
        // }[];
    }
);