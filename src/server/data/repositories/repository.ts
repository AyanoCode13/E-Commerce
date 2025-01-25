import { IModel } from "../interfaces/IModel";

export default class Repository implements IModel {
    constructor(private readonly model: IModel) {}
    add(data: any): Promise<any> {
        return this.model.add(data);
    }
    update(id: string, data: any): Promise<any> {
        return this.model.update(id, data);
    }
    remove(id: string): Promise<any> {
        return this.model.remove(id);
    }
    get(id: string): Promise<any> {
        return this.model.get(id);
    }
    getAll(data: any): Promise<any> {
        return this.model.getAll(data);
    }

}
