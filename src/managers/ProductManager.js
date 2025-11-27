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
    try {
      const requiredFields = ["title", "description", "price", "code", "stock"];
      const missing = requiredFields.filter((f) => !product[f]);

      if (missing.length > 0) {
        throw new Error(
          `Faltan los campos obligatorios: ${missing.join(", ")}`
        );
      }
      const products = await this.getProducts();

      const newId =
        products.length === 0 ? 1 : products[products.length - 1].id + 1;

      const newProduct = { ...product, id: newId };

      products.push(newProduct);

      await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));

      return newProduct;
    } catch (error) {
      console.error("Error agregando producto:", error.message);
      return null;
    }
  }

  async updateProduct(id, updatedData) {
    try {
      const products = await this.getProducts();
      const index = products.findIndex((p) => p.id === id);

      if (index === -1) return null;

      updatedData.id = products[index].id;

      products[index] = { ...products[index], ...updatedData };

      await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
      return products[index];
    } catch (error) {
      console(error);
      console.error("Error actualizando producto:", error);
      return null;
    }
  }
  async deleteProduct(id) {
    try {
      const products = await this.getProducts();
      const newProducts = products.filter((p) => p.id !== id);

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(newProducts, null, 2)
      );
    } catch (error) {
      console.error("Error eliminando producto:", error);
    }
  }
  async getProductById(id) {
    try {
      const products = await this.getProducts();
      return products.find((p) => p.id === id) || null;
    } catch (error) {
      console.error("Error obteniendo ID:", error);
      return null;
    }
  }
}
