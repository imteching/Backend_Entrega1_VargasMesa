import express form "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extend: true }));

app.use("./api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.listen(8080, () => {
    console.log("Servidor escuchando en puerto 8080");
});