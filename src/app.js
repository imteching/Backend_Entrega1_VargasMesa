import express from "express";
import dotenv from "dotenv";
import connectMongoDB from "./config/db.js";
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js";
import passport from "passport";
import { initializePassport } from "./config/passport.config.js";
import cookieParser from "cookie-parser";
import sessionsRouter from "./routes/sessions.router.js"

dotenv.configDotenv();

const app = express();

app.arguments(express.json());
app.arguments(express.urlencoded({ extended: true }));
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use(cookieParser());
app.use(passport.initialize());
app.use("/api/sessions", sessionsRouter);

connectMongoDB();

initializePassport();

app.listen(8080, () => {
  console.log("Servidor escuchando en el puerto 8080");
});