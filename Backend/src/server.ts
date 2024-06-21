import fastify, { FastifyInstance } from "fastify";
import cors from '@fastify/cors';
import { fastifyMultipart } from '@fastify/multipart'
import { fastifyStatic } from '@fastify/static';
import path from "path";

import { 
    serializerCompiler, 
    validatorCompiler
} from 'fastify-type-provider-zod';

//routes import
import { userRoutes } from "./routes/User.routes";
import { commentsRoutes } from "./routes/Comment.routes";
import { ProductsRoutes } from "./routes/Product.routes";
import { CartRoutes } from "./routes/Cart.routes";
import { OrderRoutes } from "./routes/Order.routes";
import { CategoryRoutes } from "./routes/Category.routes";

//Error Handler
import { errorHandler } from "./errorHandler";

const app: FastifyInstance = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

const __dirname = path.resolve(path.dirname(""));

app.register(fastifyStatic, {
  root: path.join(__dirname, "images/"),
});

app.register(fastifyMultipart);

//Config Cors to accept frontEnd Requests
app.register(cors, {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
});

//Users
app.register(
    userRoutes, 
    { 
        prefix: '/user'
    }
);

//Comments
app.register(
    commentsRoutes, 
    { 
        prefix: '/comments'
    }
);

//Products
app.register(
    ProductsRoutes, 
    { 
        prefix: '/products'
    }
);

//Cart
app.register(
    CartRoutes, 
    { 
        prefix: '/cart'
    }
);

//Order
app.register(
    OrderRoutes, 
    { 
        prefix: '/checkout'
    }
);

//Category
app.register(
    CategoryRoutes, 
    { 
        prefix: '/categories'
    }
);

//Chat
app.register(
    CategoryRoutes,
);

//Setting Error Handler Function
app.setErrorHandler(errorHandler);

const port = 8080;

try {
    app.listen(
        { port: port },
        () => {console.log(`Server Running at Port: ${port}`);}
    )
} catch (error) {
    console.log('Error Starting the Server');
    process.exit(1);
}