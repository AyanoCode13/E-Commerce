import { IRepository } from "../data/interfaces/IRepository";

export default class Controller {
    constructor(private readonly repository: IRepository) {}
    add(data: any): Promise<any> {
        return this.repository.add(data);
    }
    update(id: string, data: any): Promise<any> {
        return this.repository.update(id, data);
    }
    remove(id: string): Promise<any> {
        return this.repository.remove(id);
    }
    get(id: string): Promise<any> {
        return this.repository.get(id);
    }
    getAll(data: any): Promise<any> {
        return this.repository.getAll(data);
    }
}