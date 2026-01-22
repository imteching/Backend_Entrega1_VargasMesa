import CartModel from "../models/cart.model.js";
import ProductModel from "../models/product.model.js";

class CartService {
    async createCart() {
        return await CartModel.create({ products: [] });
    }

    async getCartById(cid) {
        return await CartModel.findById(cid).populate("products.product").lean()
    }

    async addProductToCart(cid, pid) {
        const cart = await CartModel.findById(cid);
        if (!cart) return null;

        const productExists = await ProductModel.findById(pid);
        if (!productExists) throw new Error("Producto no existe");

        const productIndex = cart.products.findIndex(
            (p) => p.product.toString() === pid
        );

        if (productIndex !== -1) {
            cart.products[productIndex].quantity++;
        } else {
            cart.products.push({ product: pid, quantity: 1 });
        }

        await cart.save();
        return cart;
    }

    // Eliminar un producto del carrito
    async deleteProductFromCart(cid, pid) {
        const cart = await CartModel.findById(cid);
        if (!cart) return null;

        cart.products = cart.products.filter(
            (p) => p.products.toString() !== pid
        );

        await cart.save();
        return cart;
    }

    // Reempalzar todos los productos
    async updateCart(cid, products) {
        return await CartModel.findByIdAndUpdate(
            cid,
            { products },
            { new: true }
        );
    }

    // Actualizar solo cantidad
    async updateProductQuantity(cid, pid, quantity) {
        const cart = await CartModel.findById(cid);
        if (!cart) return null;

        const product = cart. products.find(
            (p) => p.product.toString() === pid
        );

        if (!product) return null;

        product.quantity = quantity;
        await cart.save();
        return cart;
    }

    // Vaciar carrito
    async clearCart(cid) {
        return await CartModel.findByIdAndUpdate(
            cid,
            { products: [] },
            { new: true }
        );
    }
}

export default CartService;