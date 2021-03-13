import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerResponseModel } from 'src/app/models/Customer/customerResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl="https://localhost:44316/api/customers/getcustomerdetails"
  constructor(private httpClient:HttpClient) { }

  getCustomers():Observable<CustomerResponseModel>{
     return this.httpClient.get<CustomerResponseModel>(this.apiUrl);
  }
}
