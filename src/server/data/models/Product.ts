import { server$ } from "@builder.io/qwik-city";
import { type Prisma } from "@prisma/client";

import { IModel } from "../interfaces/IModel";
import { Database } from "../db";


export const add = server$(async (data:Prisma.ProductCreateInput) => {
 
  const product  = await Database._instance.product.create({
    data: data
  });
});




type CountResultPages = {
  categoryId:string
  take:number
  page:number
}




export const getNumberOfPages = server$(async(data:CountResultPages)=>{
  if(!data.categoryId){
    return 0
  }
 const results = await Database._instance.product.count({
    where:{
      category:{
        every:{
          id:data.categoryId
        }
      }
    },
    skip:(data.page-1)*data.take || 0,
  })
  return Math.ceil(results/data.take)
 
})



class Product implements IModel {
  constructor(private readonly db: Prisma.ProductDelegate) {}
  async add(data: Prisma.ProductCreateInput): Promise<Prisma.ProductCreateInput> {
    return await this.db.create({
      data: data
    });
  }
  async update(id: string, data: any): Promise<any> {
    return await this.db.update({
      where: {
        id: id,
      },
      data: data,

    })
  }
  async remove(id: string): Promise<any> {
    return await this.db.delete({
      where:{
        id:id
      }
    })
  }
  async get(id: string): Promise<any> {
    return this.db.findUnique({
      where:{id}
    })
  }
  async getCategoryProducts ({id}:{id:string}) {
    if(!id){
      return []
    }
    return await Database.getinstance().product.findMany({
      
      where:{
        category:{
          every:{
            id: id
          }
          
        },
        
      },
     
    });
  }
  
  getAll(data: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
}

export default new Product(Database.getinstance().product)