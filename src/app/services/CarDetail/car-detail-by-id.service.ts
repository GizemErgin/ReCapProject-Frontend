import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDto } from 'src/app/models/Car/carDto';
import { ListResponseModel } from 'src/app/models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarDetailByIdService {

  
  apiUrl="https://localhost:44316/api/"
  constructor(private httpClient:HttpClient) { }

  getCarDetailById(carId:number):Observable<ListResponseModel<CarDto>>{
    let newPath=this.apiUrl+"cars/getcardetailsbyid?carId="+carId
    return this.httpClient.get<ListResponseModel<CarDto>>(newPath)
  }
}
