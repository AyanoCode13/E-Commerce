import { Prisma } from "@prisma/client";
import { IModel } from "../interfaces/IModel";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { PrismaClient } from "@prisma/client/scripts/default-index.js";

export default abstract class Model{
    
    constructor(private readonly db: PrismaClient) {}
    abstract add(data: any): void
    abstract update(id: string, data: any): void
    abstract remove(id: string): void;
    abstract get(id: string): void;
    abstract getAll(data: any): void;
}