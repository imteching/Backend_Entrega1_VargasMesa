import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        code: {
            type: String,
            unique: true
        },
        price: Number,
        status: {
            type: Boolean,
            default: true
        },
        stock: Number,
        category: String,
        thumbnails: {
            type: [String],
            default: []
        }
    },
    { timestamps: true }
);

productSchema.plugin(mongoosePaginate);

const ProductModel = mongoose.model("Products", productSchema);
export default ProductModel;