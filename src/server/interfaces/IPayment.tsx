export default interface IPayment {
    pay (data:any): Promise<any>;
}