import fs from "fs";

export default class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async getProducts() {
    try {
      if (!fs.existsSync(this.path)) return [];
      const data = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error leyendo productos:", error);
      return [];
    }
  }

  async addProduct(product) {
    const products = await this.getProducts();

    const newId =
      products.length === 0 ? 1 : products[products.length - 1].id + 1;

    const newProduct = { ...product, id: newId };

    products.push(newProduct);

    await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));

    return newProduct;
  }

  async updateProduct(id, updatedData) {
    const products = await this.getProducts();
    const index = products.findIndex((p) => p.id === id);

    if (index === -1) return null;

    updatedData.id = products[index].id;

    products[index] = { ...products[index], ...updatedData };

    await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
    return products[index];
  }

  async deleteProduct(id) {
    const products = await this.getProducts();
    const newProducts = products.filter((p) => p.id !== id);

    await fs.promises.writeFile(
      this.path,
      JSON.stringify(newProducts, null, 2)
    );
  }
  async getProductById(id) {
    const products = await this.getProducts();
    return products.find((p) => p.id === id) || null;
  }
}
