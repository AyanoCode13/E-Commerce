
import { server$ } from "@builder.io/qwik-city";
import IProductRepository from "../interfaces/IProductRepository";
import Product from "../data/models/Product";
import ProductRepository from "../data/repositories/productRepository";


class ProductController {
    constructor(readonly repository: IProductRepository) {}
    async getProductsByCategory(categoryId: string) {
      
        return await this.repository.getCategoryProducts(categoryId)
    }
}

export default new ProductController(new ProductRepository(Product))