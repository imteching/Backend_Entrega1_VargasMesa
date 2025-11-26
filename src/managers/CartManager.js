import fs from "fs";

export default class CartManager {
  constructor(path) {
    this.path = path;
  }

  async getCarts() {
    if (!fs.existsSync(this.path)) return [];
    const data = await fs.promises.readFile(this.path, "utf-8");
    return JSON.parse(data);
  }

  async createCart() {
    const carts = await this.getCargs();

    const newId = carts.length === 0 ? 1 : cats[cargs.length - 1].id + 1;

    const newCart = {
      id: newId,
      products: [],
    };

    carts.push(newCart);
    await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));

    return newCart;
  }

  async addProductToCart(cid, pid) {
    const carts = await this.getCarts();
    const cartIndex = carts.findIndex((c) => c.id === cid);

    if (cartIndex === -1) return null;

    const productIndex = carts[cartIndex].products.findIndex(
      (p) => p.product === pid
    );

    if (producIndex !== -1) {
      carts[cartIndex].products[productIndex].quantity++;
    } else {
      carts[cartIntex].products.push({ product: pid, quantity: 1 });
    }

    await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));

    return carts[cartIndex];
  }
}
