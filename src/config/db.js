import mongoose from "mongoose";

const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("✅ Conectado a MongoDB");
    } catch (error) {
        console.error("❌ Error conectando a MongoDB:", error.message);
    }
};

export default connectMongoDB;