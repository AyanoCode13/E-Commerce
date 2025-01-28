import IProductRepository from "../../interfaces/IProductRepository";
import Product from "../models/Product";
import Repository from "./repository";

export default class ProductRepository extends Repository implements IProductRepository{
    constructor(private readonly productModel: typeof Product) {
        super(productModel);
    }
    async getCategoryProducts(categoryId: string) {
        return await this.productModel.getCategoryProducts({
            id: categoryId
        });
    }
}
