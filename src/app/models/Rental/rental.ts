export interface Rental{
    id?:number;
    carId:number;
    customerId:number;
    rentDate:Date;
    estReturnDate?:Date;
    returnDate?:Date;
}