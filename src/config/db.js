import mongoose from "mongoose";

const connectMongoDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://entrega:appEnsayo@cluster0.urdtny7.mongodb.net/entregaFinal?appName=Cluster0");
        console.log("✅ Conectado a MongoDB");
    } catch (error) {
        console.error("❌ Error conectando a MongoDB:", error.message);
    }
};

export default connectMongoDB;