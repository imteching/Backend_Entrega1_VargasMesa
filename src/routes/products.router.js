import { Router } from "express";
import ProductService from "../services/product.service.js";

const router = Router();
const ProductService = new ProductService();

router.get("/", async (req, res) => {
  try {
    const { limit, page, sort, query } = req.query;

    const result = await productService.getProducts({
      limit: Number(limit) || 10,
      page: Number(page) || 1,
      sort,
      query
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

router.get("/:pid", async (req, res) => {
  const product = await productService.getProductById(req.params.pid);

  if (!product)
    return res.status(404).json({ error: "Producto no encontrado" });

  res.json(product);
});

router.post("/", async (req, res) => {
  const newProduct = await productService.createProduct(req.body);
  res.status(201).json(newProduct);
});

router.delete("/:pid", async (req, res) => {
  await productService.deleteProduct(req.params.pid);
  res.json({ message: "Producto eliminado" });
});

export default router;