import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { RentalDto } from 'src/app/models/Rental/rentalDto';
import { ResponseModel } from 'src/app/models/responseModel';


@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl="https://localhost:44316/api/"
  constructor(private httpClient:HttpClient) { }

  getRentals():Observable<ListResponseModel<RentalDto>>{
      let newPath:string=this.apiUrl+"rentals/getrentaldetails"
      return this.httpClient.get<ListResponseModel<RentalDto>>(newPath);
  }

  Addrental(rental:RentalDto):Observable<ResponseModel>{
    let path = this.apiUrl+"rentals/add";
      return this.httpClient.post<ResponseModel>(path,rental);
  }
  getRentalsByCarId(carId:number):Observable<ListResponseModel<RentalDto>>
  {
    let newPath=this.apiUrl+"getrentaldetailsbycarid?carId="+carId;
    return this.httpClient.get<ListResponseModel<RentalDto>>(newPath);
  }
}
