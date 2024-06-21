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
 