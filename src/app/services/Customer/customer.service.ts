import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerDto } from 'src/app/models/Customer/customerDto';
import { ListResponseModel } from 'src/app/models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl="https://localhost:44316/api/"
  constructor(private httpClient:HttpClient) { }

  getCustomers():Observable<ListResponseModel<CustomerDto>>{
    let newPath:string=this.apiUrl+"customers/getcustomerdetails"
     return this.httpClient.get<ListResponseModel<CustomerDto>>(newPath);
  }
}
