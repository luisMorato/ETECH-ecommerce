export type dbCategory = {
   id: number,
   name: string 
}

export type categoriesAndSubCategories = ( 
    dbCategory & {
        subCategories: {
            id: number,
            name: string,
            categoryId: number
        }[]
    }
);

export type categoryAndSubCategories = ( 
    dbCategory & {
        subCategories: {
            id: number,
            name: string,
            categoryId: number
        }[]
    }
);


export interface categoryUseCasesProps {
    AddCategory: (categoryName: string) => Promise<{ add: dbCategory | undefined, message: string }  | undefined>,
    DeleteCategory: (categoryId: number) => Promise<{ message: string } | undefined>,
    GetCategories: () => Promise<categoriesAndSubCategories[] | undefined>,
    GetCategory: (categoryName: string) => Promise<categoryAndSubCategories | undefined>
}