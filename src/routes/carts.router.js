import { Router } from "express";
import CartService from "../services/cart.service.js";

const router = Router();
const cartService = new CartService();

// Crear carrito
router.post("/", async (req, res) => {
  const cart = await cartService.createCart();
  res.status(201).json(cart);
});

// Obtener carrito con populate
router.get("/:cid", async (req, res) => {
  const cart = await cartService.getCartById(req.params.cid);

  if (!cart)
    return res.status(404).json({ error: "Carrito no encontrado" });

  res.json(cart);
});

// Agregar producto
router.post("/:cid/products/:pid", async (req, res) => {
  try {
    const cart = await cartService.addProductToCart(
      req.params.cid,
      req.params.pid
    );
    res.json(cart);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Eliminar producto
router.delete("/:cid/products/:pid", async (req, res) => {
  const cart = await cartService.deleteProductFromCart(
    req.params.cid,
    req,params.pid
  );

  if (!cart)
    return res.status(404).josn({ error: "Carrito no encontrado" });

  res.json(cart);
});

// Reemplazar carrito completo
router.put("/:cid", async (req, res) => {
  const cart = await cartService.updateCart(req.params.cid, req.body);
  res.json(cart);
});

// Actualizar cantidad
router.put("/:cid/products/:pid", async (req, res) => {
  const { quantity } = req.body;

  const cart = await cartService.updateProductQuantity(
    req.params.cid,
    req.params.pid,
    quantity
  );

  if (!cart)
    return res.status(404).json({ error: "Producto o carrito no encontrado" });

  res.json(cart);
});

// Vaciar carrito
router.delete("/:cid", async (req, res) => {
  const cart = await cartService.clearCart(req.params.cid);
  res.json(cart);
});

export default router;