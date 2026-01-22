import ProductModel from "../models/product.model";

class ProductService {
    async getProducts({ limit = 10, page = 1, sort, query }) {
        const filter = {};

        // filtros
        if (query) {
            const [key, value] = query.split(":");

            if (key === "category") {
                filter.category = value;
            }

            if (key === "status") {
                filter.status = value === "true";
            }
        }

        // Ordenamiento
        let sortOption = {};
        if (sort === "asc") sortOption.price = 1;
        if (sort === "desc") sortOption.price = -1;

        const options = {
            limit,
            page,
            sort: sortOption,
            lean: true
        };

        const result = await ProductModel.paginate(filter, options);

        return {
            status: "success",
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage ? `/api/products?page=${result.prevPage}` : null,
            nextLink: result.hasNextPage ? `/api/products?page=${result.nextPage}` : null
        };
    }

    async getProductById(pid) {
        return await ProductModel.create(product);
    }

    async deleteProduct(pid) {
        return await ProductModel.findByIdAndDelete(pid);
    }
}

export default ProductService;