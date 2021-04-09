export interface Payment{
    id?:number;
    carId:number;
    cardNameSurname?:string;
    cardNumber?:string;
    cardExpiryDate?:string;
    cardCvv?: string;
    totalPaye:number;
}