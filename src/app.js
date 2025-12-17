import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import handlebars from "express-handlebars";

import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("src/public"));

// handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", "src/views");
app.set("view engine", "handlebars");

//routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

//sockets
io.on("connection", (socket) => {
  console.log("Cliente conectado");

  socket.on("newProduct", async (product) => {
    await ProductManager.addProduct(product);
    const products = await ProductManager.getProducts();
    io.emit("productsUpdated", products);
  });

  socket.on("deleteProduct", async (id) => {
    await ProductManager.deleteProduct(id);
    const products = await ProductManager.getProducts();
    io.emit("productsUpdated", products);
  });
});

httpServer.listen(8080, () => {
  console.log("Servidor escuchando en puerto 8080");
});
