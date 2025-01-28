import { server$ } from "@builder.io/qwik-city";
import ICategoryReporitory from "../../interfaces/ICategoryRepository";
import Category from "../models/Category";
import Repository from "./repository";

export default class CategoryRepository extends Repository implements ICategoryReporitory{
    constructor(private readonly categoryModel: Category) {
        super(categoryModel);
    }
    async getRootCategories() {
        return await this.categoryModel.getRootCategories();
        
    }
    async getSubCategories (categoryId: string) {
        return await this.categoryModel.getSubCategories(categoryId);
    }
}


