import express from "express";
import dotenv from "dotenv";
import connectMongoDB from "./config/db.js";
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js";
import passport from "passport";
import { initializePassport } from "./config/passport.config.js";
import cookieParser from "cookie-parser";
import sessionsRouter from "./routes/sessions.router.js"

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Passport
initializePassport();
app.use(passport.initialize());

// Rutas
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/sessions", sessionsRouter);

// DB
connectMongoDB();

// Server
app.listen(8080, () => {
  console.log("Servidor escuchando en el puerto 8080");
});