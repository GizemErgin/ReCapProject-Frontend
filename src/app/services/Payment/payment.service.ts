import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Payment } from 'src/app/models/Payment/payment';
import { Rental } from 'src/app/models/Rental/rental';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  rentalCar:Rental;
  totalPaye:number;

  apiUrl="https://localhost:44316/api/" 
  constructor(private httpClient:HttpClient) { }


  getPayments():Observable<ListResponseModel<Payment>>{
    let newPath= this.apiUrl + "payments/getall" 
    return this.httpClient.get<ListResponseModel<Payment>>(newPath);
  } 

  getPaymentById(id:number):Observable<ListResponseModel<Payment>>{
    let newPath= this.apiUrl + "payments/getbypaymentid?id=" + id; 
    return this.httpClient.get<ListResponseModel<Payment>>(newPath);
  } 

  addPayment(payment: Payment):Observable<ResponseModel>{
    let newPath= this.apiUrl + "payments/add" 
    return this.httpClient.post<ResponseModel>(newPath,payment);
  }

  getRental(){
    return this.rentalCar;
  }

  getRentalTotalPaye(){
    return this.totalPaye;
  }

  setRentalCar(rental:Rental, totalRentalPaye:number){
    this.rentalCar=rental;
    this.totalPaye=totalRentalPaye;
  }
}


