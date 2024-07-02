import { FastifyInstance } from "fastify";
import fs from "fs";
import path from "path";

import { MultipartFile } from "@fastify/multipart";
// import { promisify } from "util";
import { Request, Response } from "express";

import { Schema, z } from "zod";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import Jwt from "jsonwebtoken";

//Middlewares
import { authentication } from "../middlewares/auth";
import { imageUpload } from "../middlewares/imageUpload";

//Utils
import { getToken } from "../utils/getToken";

//Classes
import { productsUseCases } from "../useCases/ProductUseCases";
import { UserUseCases } from "../useCases/UserUseCases";

//Schemas
import { productSchema, requestProductData } from "../schemas/productSchema";
import { deleteProduct, requestProduct } from "../interfaces/Product.interface";
import { Forbidden } from "../_errors/Fobidden";
type JwtPayload = {
  userId: number;
};

//Instances
const productUseCases = new productsUseCases();
const userUseCases = new UserUseCases();

//Routes
export const ProductsRoutes = async (app: FastifyInstance) => {
  app.addHook("preHandler", (req, reply, done) => {
    try {
      const multerArray = imageUpload.array("image");
      multerArray(req.raw as Request, reply.raw as Response, done);
    } catch (error: any) {
      console.log("Error: ", error);
    }
  });

  app
  .withTypeProvider<ZodTypeProvider>()
  .post<{ Body: z.infer<typeof requestProductData> }>(
    "/", {
      preHandler: authentication,
      schema: {
        response: {
          201: z.object({
            product: productSchema,
            message: z.string(),
          }),
        },
      },
    }, async (req, reply) => {
      //Try: const data = requestProductData.parse(req.body);
      const data = (req.raw as Request).body;
      const files: MultipartFile[] = (req.raw as any).files;

      const token = await getToken(req);

      if (token) {
        const { userId } = Jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload;

        //Use userId to check if user role is === ADMIN before continue
        const user = await userUseCases.getUniqueUser(userId);

        if (user?.role !== "ADMIN") {
          throw new Forbidden("User Don't Have Permission");
        }

        const filteredImages = files.filter((file) => file.filename);
        const fileNames = filteredImages.map((file) => file.filename);

        const productData = {
          name: String(data.name),
          price: data.price,
          desc: String(data.desc).split(","),
          stock: Number(data.stock),
          brand: String(data.brand),
          category: String(data.category),
          subCategory: String(data.subCategory),
        };

        const register = await productUseCases.registerProduct(
          productData,
          fileNames
        );

        if (register) {
          const { product, message } = register;
          return reply.code(201).send({ product, message });
        }
      }
    }
  );

  app
  .withTypeProvider<ZodTypeProvider>()
  .get( "/", {
      schema: {
        querystring: z.object({
          perPage: z.string().transform((val) => parseInt(val)).optional(),
          pageIndex: z.string().default("0").transform((val) => parseInt(val)).optional(),
          category: z.string().optional(),
          subcategory: z.string().optional(),
          brand: z.string().optional(),
          query: z.string().optional(),
        }),
        response: {
          200:
            z.object({
              products: z.array(productSchema).nullable(),
              quantity: z.number().int().nullish(),
            }) || [],
        },
      },
    }, async (req, reply) => {
      const { category, subcategory, brand, perPage, pageIndex, query } = req.query;
      const res = await productUseCases.getAllProducts(
        perPage,
        category,
        subcategory,
        brand,
        pageIndex,
        query
      );

      if (res) {
        const { products, quantity } = res;
        return reply.code(200).send({ products, quantity });
      }
    }
  );

  app
  .withTypeProvider<ZodTypeProvider>()
  .get("/images/:productId",
    {
      schema: {
        params: z.object({
          productId: z.string().transform((val) => parseInt(val)),
        }),
      },
    }, async (req, reply) => {
      const { productId } = req.params;
      const res = await productUseCases.getUniqueProduct(productId);

      if(res){
        const { product } = res;
        const imagesName = product?.image;

        const imagesPath =  imagesName?.map((image) => path.join(process.cwd(), "public/images/products", image));
        const imagesBuffer = imagesPath?.map((path) => fs.readFileSync(path));

        return reply.send({ imagesBuffer });
      }
    }
  );

  app
  .withTypeProvider<ZodTypeProvider>()
  .get("/:productId", {
      schema: {
        params: z.object({
          productId: z.string().transform((val) => parseInt(val)),
        }),
        response: {
          200: z.object({
            product: productSchema,
            // commentData: z.array(z.object({
            //   id: z.number(),
            //   text: z.string(),
            //   user: z.object({
            //       id: z.number(),
            //       name: z.string(),
            //       image: z.instanceof(Buffer).optional()
            //   })
            // })).optional()
          }),
        },
      },
    }, async (req, reply) => {
      const { productId } = req.params;

      const res = await productUseCases.getUniqueProduct(productId);

      if (res) {
        //const { product, commentData } = res
        const { product } = res
        return reply.code(200).send({ product });
      }
    }
  );

  app
  .withTypeProvider<ZodTypeProvider>()
  .delete('/', {
    preHandler: authentication,
    schema: {
      body: z.object({
        productId: z.number()
      }),
      response: {
        200: z.object({
          message: z.string().nullish()
        }),
      }
    }
  }, async (req, reply) => {
      const data = req.body;
      
      const token = await getToken(req);

      if (token) {
        const { userId } = Jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload;

        const user = await userUseCases.getUniqueUser(userId);

        if (user?.role !== "ADMIN") {
          throw new Forbidden("User Don't Have Permission, Needs to be an Admin");
        }

        const res = await productUseCases.deleteProduct(data as deleteProduct);

        if(res){
          const { message } = res;
          return reply.send({ message });
        }
      }
  });
};
