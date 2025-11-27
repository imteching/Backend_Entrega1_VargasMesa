import fs from "fs";

export default class CartManager {
  constructor(path) {
    this.path = path;
    this.productsPath = "src/data/products.json";
  }

  async getCarts() {
    try {
      if (!fs.existsSync(this.path)) return [];
      const data = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error leyendo carritos:", error);
      return [];
    }
  }

  async getProducts() {
    try {
      if (!fs.existsSync(this.productsPath)) return [];
      const data = await fs.promises.readFile(this.productsPath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error leyendo productos:", error);
      return [];
    }
  }

  async createCart() {
    try {
      const carts = await this.getCarts();

      const newId = carts.length === 0 ? 1 : carts[carts.length - 1].id + 1;

      const newCart = {
        id: newId,
        products: [],
      };

      carts.push(newCart);
      await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));

      return newCart;
    } catch (error) {
      console.error("Error creando carrito:", error);
      return null;
    }
  }

  async getCartById(id) {
    try {
      const carts = await this.getCarts();
      return carts.find((c) => c.id === id) || null;
    } catch (error) {
      console.error("Error obteniendo carrito:", error);
      return null;
    }
  }

  async addProductToCart(cid, pid) {
    try {
      const carts = await this.getCarts();
      const products = await this.getProducts();

      // validar si el carrito existe
      const cartIndex = carts.findIndex((c) => c.id === cid);
      if (cartIndex === -1) return null;

      // validar si el producto existe
      const productExists = products.some((p) => p.id === pid);
      if (!productExists) {
        console.error("El producto no existe, no puede agregarse al carrito.");
        return null;
      }
      const productIndex = carts[cartIndex].products.findIndex(
        (p) => p.product === pid
      );

      if (productIndex !== -1) {
        carts[cartIndex].products[productIndex].quantity++;
      } else {
        carts[cartIndex].products.push({ product: pid, quantity: 1 });
      }

      await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));

      return carts[cartIndex];
    } catch (error) {
      console.error("Error agregando producto al carrito:", error);
      return null;
    }
  }
}
