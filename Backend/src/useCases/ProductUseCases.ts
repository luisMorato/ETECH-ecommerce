import path from "path";
import fs from 'fs';

import { db } from "../lib/db/db";

//Classes
import { Product } from "../entities/Product";

//Types
import {
  requestProduct,
  productsUseCasesProps,
  deleteProduct,
} from "../interfaces/Product.interface";
import { BadRequest } from "../_errors/BadRequest";

export class productsUseCases implements productsUseCasesProps {
  registerProduct = async (data: Omit<requestProduct, 'image'>, filesName: string[]) => {
    try {
      const { 
        name, 
        price, 
        desc, 
        stock, 
        category, 
        subCategory
      } = data;

      const categoryAndSubCategory = await db?.productCategory.findFirst({
        where: {
          name: {
            contains: category,
          },
        },
        include: {
          subCategories: {
            where: {
              name: {
                contains: subCategory
              }
            }
          }
        }
      });

      if(!categoryAndSubCategory){
        throw new BadRequest("Category is Needed!");
      }

      const formatedPrice = parseFloat(price.replace(',', '.'));

      const registeredProduct = await db?.product.create({
        data: {
          name,
          image: [...filesName],
          price: formatedPrice,
          desc: [...desc],
          stock,
          comment: {},
          categoryId: categoryAndSubCategory.id,
          subCategoryId: categoryAndSubCategory.subCategories[0].id
        },
      });

      if (registeredProduct) {
        const product = new Product(registeredProduct);

        return { product: product.productData, message: "Product Registered!" };
      }

      throw new Error("Something Went Wrong!");
    } catch (error) {
      console.log("error: ", error);
      return null;
    }
  };

  deleteProduct = async (data: deleteProduct) => {
      const { productId } = data;

      const productData = await this.getUniqueProduct(productId);

      if(!productData){
        throw new BadRequest('Product Not Found!');
      }

      await db?.cartProducts.deleteMany({
        where: {
          productId
        }
      });

      const del = await db?.product.delete({
        where: {
          id: productId,
        },
      });

      if(del){
        const { product } = productData;

        const imagesName = product?.image;
        const imagesPath =  imagesName?.map((image) => path.join(process.cwd(), "public/images/products", image));

        imagesPath?.forEach((path) => {
          fs.unlink(path, (error) => {
            console.log(error)
          });
        })

        return { message: 'Product Deleted from Database' };
      }

      throw new Error('Failed to delete product');
  }

  getUniqueProduct = async (productId: number) => {
    try {
      const dbProduct = await db?.product.findUnique({
        where: {
          id: productId,
        },
        include: {
          comment: {
            select: {
              id: true,
              text: true,
              user: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              },
            },
          },
          categories: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      if (dbProduct) {
        const product = new Product(dbProduct);

        //const comments = (product.productData).comment?.map((data) => data);

        // interface commentData { 
        //   id: number,
        //   text: string,
        //   user: {
        //     id: number, 
        //     name: string, 
        //     image?: Buffer, 
        //   } 
        // }
        // let commentData: commentData[] = [];

        // if(comments){
        //   commentData = comments.map((data) => {
        //       return {
        //         id: data.id,
        //         text: data.text,
        //         user: {
        //           id: data.user.id,
        //           name: data.user.name,
        //           imageBuffer: data.user.image ? fs.readFileSync(path.join(process.cwd(), "public/images/user", data.user.image)) : undefined
        //         }
        //       }
        //   });
        //}

        return {product: product.productData || null};
      }
    } catch (error) {
      console.log("error: ", error);
      return null;
    }
  };

  getAllProducts = async (perPage: number, category?: string, subcategory?: string, brand?: string, pageIndex?: number, query?: string) => {
    try {
      const quantity = await db?.product.count({
        where: {
          subCategories: {
            name: {
              contains: !subcategory || subcategory === "all" ? "" : subcategory
            },
            AND: {
              categories: {
                  name: {
                    contains: category
                  }
              }
            }
          }
        }
      });
      
      const dbProducts = await db?.product.findMany({
        where: {
          name: {
            contains: query,
            mode: 'insensitive',
          },
          subCategories: {
            name: {
              contains: !subcategory || subcategory === "all" ? "" : subcategory
            },
            AND: {
              categories: {
                  name: {
                    contains: category
                  }
              }
            }
          }
        },
        take: perPage,
        skip: ( pageIndex || 0 ) * perPage,
        include: {
          categories: true,
          subCategories: true
        },
      });

      if (dbProducts) {
        const products = dbProducts.map((product) => new Product(product).productData);

        return {products: products || [], quantity: query ? products.length : quantity};
      }
    } catch (error) {
      console.log("error: ", error);
      return null;
    }
  };
}
