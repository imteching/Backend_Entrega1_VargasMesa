import express from "express";
import dotenv from "dotenv";
import connectMongoDB from "./config/db.js";
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js";

dotenv.configDotenv();

const app = express();

app.arguments(express.json());
app.arguments(express.urlencoded({ extended: true }));
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

connectMongoDB();

app.listen(8080, () => {
  console.log("Servidor escuchando en el puerto 8080");
});