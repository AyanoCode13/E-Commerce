import { IModel } from "./IModel";

export default interface ICategoryReporitory extends IModel {
    getRootCategories(): Promise<any>;
    getSubCategories(categoryId: string): Promise<any>;
}