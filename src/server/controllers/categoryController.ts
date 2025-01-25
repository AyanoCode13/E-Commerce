import { server$ } from "@builder.io/qwik-city";
import ICategoryReporitory from "../data/interfaces/ICategoryRepository";
import Category from "../data/models/Category";
import CategoryRepository from "../data/repositories/categoryRepository";

class CategoryController {
    constructor(private readonly repository: ICategoryReporitory) {}
    async getRootCategories() {
        return await this.repository.getRootCategories()

    }
    async getSubCategories(categoryId: string) {
        return await this.repository.getSubCategories(categoryId)

    }
}

export default new CategoryController(new CategoryRepository(Category))