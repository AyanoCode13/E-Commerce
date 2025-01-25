import { IModel } from "./IModel";

export default interface IProductRepository extends IModel {
    getCategoryProducts(categoryId:string): Promise<any>
}