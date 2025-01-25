import { PrismaClient, type Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { server$ } from "@builder.io/qwik-city";
export interface IModel {
    add(data:any): Promise<any>;
    update(id:string,data:any): Promise<any>
    remove(id:string): Promise<any>
    get(id:string): Promise<any>;
    getAll(data:any): Promise<any>;    
}