import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";

const router = Router();
const productManager = new ProductManager("src/data/products.json");

router.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  res.json(products);
});

router.get("/:pid", async (req, res) => {
  const pid = parseInt(req.params.pid);
  const product = await productManager.getProductById(pid);

  if (!product)
    return res.status(404).json({ error: "Producto no encontrado" });

  res.json(product);
});

router.post("/", async (req, res) => {
  const product = req.body;
  const newProduct = await productManager.addProduct(product);
  res.status(201).json(newProduct);
});

router.put("/:pid", async (req, res) => {
  const pid = parseInt(req.params.pid);
  const updated = await productManager.updateProduct(pid, req.body);

  if (!updated)
    return res.status(404).json({ error: "Producto no encontrado" });

  res.json(updated);
});

router.delete("/:pid", async (req, res) => {
  const pid = parseInt(req.params.pid);
  await productManager.deleteProduct(pid);
  res.json({ message: "Producto eliminado" });
});

export default router;
