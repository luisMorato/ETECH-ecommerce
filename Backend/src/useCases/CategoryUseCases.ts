import { BadRequest } from "../_errors/BadRequest";
import { Category } from "../entities/Category";
import { categoryUseCasesProps } from "../interfaces/Category.interface";
import { db } from "../lib/db/db";

export class CategoryUseCases implements categoryUseCasesProps {
    AddCategory = async (categoryName: string) => {
        try {
            const existingCategory = await db?.productCategory.findFirst({
                where: {
                    name: categoryName
                }
            });

            if(existingCategory){
                throw new BadRequest("Category Already Registered");
            }

            const add = await db?.productCategory.create({
                data: {
                    name: categoryName,
                },
                include: {
                    subCategories: true
                }
            });
         
            if(add){
                const category = new Category(add);

                return { add: category.getCategory, message: "Category Added Successfully!" };
            }
        } catch (error) {
            console.log('error: ', error);
        }
    }

    DeleteCategory = async (categoryId: number) => {
        try {
            const existingCategory = await db?.productCategory.findUnique({
                where: {
                    id: categoryId
                }
            });
    
            if(!existingCategory){
                throw new BadRequest("Category Not Found!");
            }
    
            const del = await db?.productCategory.delete({
                where: {
                    id: categoryId
                }
            });
    
            if(del){
                return { message: "Category Deleted!" }; 
            }
        } catch (error) {
            console.log('error: ', error);
        }
    }

    GetCategories = async () => {
        const dbCategories = await db?.productCategory.findMany(
            {
                include: {
                    subCategories: true
                }
            }
        );

        if(dbCategories){
            const categories = dbCategories.map((category) => new Category(category).getCategory);

            return categories;
        }
    }
}