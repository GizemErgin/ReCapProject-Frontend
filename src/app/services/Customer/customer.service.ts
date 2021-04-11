import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/models/Customer/customer';
import { CustomerDto } from 'src/app/models/Customer/customerDto';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';

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

  getCustomerById(id:number):Observable<SingleResponseModel<CustomerDto>>{
    let newPath:string=this.apiUrl+"customers/getcustomerdetailsbyid?customerId="+id;
    return this.httpClient.get<SingleResponseModel<CustomerDto>>(newPath);
  }

  update(customer:CustomerDto):Observable<ResponseModel>{
    let newPath:string = this.apiUrl+"customers/update"
    return this.httpClient.post<ResponseModel>(newPath,customer);
  }

  getCustomerDetailByUserId(userId:number):Observable<SingleResponseModel<CustomerDto>>{
    let newPath =this.apiUrl+"customers/getcustomerdetailsbyuserid?userId="+userId
    return this.httpClient.get<SingleResponseModel<CustomerDto>>(newPath)
  }

  getCustomerByUserId(userId:number):Observable<SingleResponseModel<Customer>>{
    let newPath =this.apiUrl+"customers/getcustomerbyuserid?userId="+userId
    return this.httpClient.get<SingleResponseModel<Customer>>(newPath)
  }

 add(customer:Customer):Observable<ResponseModel>{
   let newPath= this.apiUrl + "customers/add"
  return this.httpClient.post<ResponseModel>(newPath,customer)
}
}
