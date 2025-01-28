import { server$ } from "@builder.io/qwik-city";
import ICategoryReporitory from "../interfaces/ICategoryRepository";
import Category from "../data/models/Category";
import CategoryRepository from "../data/repositories/categoryRepository";
import { Database } from "../data/db";

class CategoryController {
    constructor(private readonly repository: ICategoryReporitory) {
        console.log("New Category Controller")
    }
    async getRootCategories() {
        return await this.repository.getRootCategories()

    }
    async getSubCategories(categoryId: string) {
        console.log(categoryId)
        return await this.repository.getSubCategories(categoryId)
        
    }
}

export default new CategoryController(new CategoryRepository(new Category(Database.getinstance().category)))