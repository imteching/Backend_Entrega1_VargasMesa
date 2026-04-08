import { TicketModel } from "../models/ticket.model";

async function purchaseCart(cart, user) {
        let total = 0;
        const productsNoStock = [];

        for (const item of cart.products) {
            const product = item.product;

            if (product.stock >= item.quantity) {
                product.stock -= item.quantity;
                await product.save();

                total += product.price * item.quantity;
            } else {
                productsNoStock.push(product._id);
            }
        }
        
        // Crear ticket solo si hay compra
        if (total > 0) {
            const ticket = await TicketModel.create({
                code: Math.random().toString(36).substring(2),
                amount: total,
                purchaser: user.email
            });

            return {
                ticket,
                productsNoStock
            };
        }

        return {
            ticket: null,
            productsNoStock
        };
    }