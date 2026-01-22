import { Router } from "express";
import { ProductModel } from "../models/product.model.js";

const router = Router();

router.get("/products", async (requestAnimationFrame, res) => {
    const {
        page = 1,
        limit = 10,
        sort,
        query
    } = req.query;

    const filter = {};

    if (query) {
        if (query === "true" || query === "false") {
            filter.status = query === "true";
        } else {
            filter.category = query;
        }
    }

    const options = {
        page,
        limit,
        lean: true
    };

    if (sort) {
        options.sort = { price: sort === "asc" ? 1 : -1 };
    }

    const result = await ProductModel.paginate(filter, options);

    res.render("index", {
        products: result.docs,
        page: result.page,
        totalPages: result.totalPages,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevPage: result.prevPage,
        nextPage: result.nextPage
    });
});

export default router;