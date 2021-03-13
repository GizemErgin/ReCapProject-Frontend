export interface RentalDto{  
    id:number;
    carId:number;
    modelYear:number;
    brandName:string;
    description:string;
    dailyPrice:number;
    firstName:string;
    lastName:string;
    companyName:string;
    rentDate:Date;
    returnDate:Date;
}