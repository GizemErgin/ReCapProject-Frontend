import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Rental } from 'src/app/models/Rental/rental';
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

  addRental(rental:Rental):Observable<ResponseModel>{
    let newPath:string = this.apiUrl+"rentals/rent";
      return this.httpClient.post<ResponseModel>(newPath,rental);
  }
  getRentalsByCarId(carId:number):Observable<ListResponseModel<RentalDto>>
  {
    let newPath=this.apiUrl+"rentals/getrentaldetailsbycarid?carId="+carId;
    return this.httpClient.get<ListResponseModel<RentalDto>>(newPath);
  }

  checkCarStatus(rental:Rental):Observable<ResponseModel> {
    let newPath = this.apiUrl + "rentals/checkcarstatus";
    return this.httpClient.post<ResponseModel>(newPath,rental);
  }
}
