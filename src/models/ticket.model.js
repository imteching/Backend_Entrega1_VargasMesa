import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    code: String,
    purchase_datetime: { type: Date, default: Date.now },
    amount: Number,
    purchser: String,
});

export const TicketModel = mongoose.model("tickets", ticketSchema);