import { type Prisma } from "@prisma/client";
import { IModel } from "../interfaces/IModel";
import { Database } from "../db";



class Category implements IModel {
  constructor(private readonly db: Prisma.CategoryDelegate) {}
  async add(data: any): Promise<any> {
    return await this.db.create({data})
  }
  async update(id: string, data: any): Promise<any> {
    return await this.db.update({
      where: {id},
      data
    })
  }
  async remove(id: string): Promise<any> {
    return await this.db.delete({
      where: {id}
    })
  }
  async get(id: string): Promise<any> {
    return await this.db.findUnique({
      where: {id}
    })
  }
  getAll(data: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  async getRootCategories() {
    return await Database.getinstance().category.findMany({
      where: {
        parents: {
          none: {},
        },
      },
      select:{
        id:true,
        name:true,
        description:true, 
      }
    });
    
  };
  async getSubCategories (categoryId: string) {
    if (!categoryId) {
      return [];
    }
    const res =  await Database.getinstance().category.findUnique({
      where: {
        id: categoryId,
      },
     select:{
      children:true
     }
    });
    return res?.children || [];
   
  }
}

export default new Category(Database.getinstance().category)
