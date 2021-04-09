import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from 'src/app/models/Car/car';
import { CarDto } from 'src/app/models/Car/carDto';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';


@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = 'https://localhost:44316/api/';
  constructor(private httpClient: HttpClient) { }

  getCars() :Observable<ListResponseModel<CarDto>>{
    let newPath:string=this.apiUrl+"cars/getcardetails"
    return this.httpClient.get<ListResponseModel<CarDto>>(newPath)
  }

  getCarsById(id:number):Observable<SingleResponseModel<Car>>{
    let newPath:string=this.apiUrl+"cars/get?carId="+id
    return this.httpClient.get<SingleResponseModel<Car>>(newPath)
  }

  getCarsByBrandId(brandId:number):Observable<ListResponseModel<CarDto>>{
    let newPath:string=this.apiUrl+"cars/getcardetailsbybrandid?brandId="+brandId
    return this.httpClient.get<ListResponseModel<CarDto>>(newPath)
  }

  getCarsByColorId(colorId:number):Observable<ListResponseModel<CarDto>>{
    let newPath:string=this.apiUrl+"cars/getcardetailsbycolorid?colorId="+colorId
    return this.httpClient.get<ListResponseModel<CarDto>>(newPath)
  }

  getCarsByBrandIdandColorId(brandId:number, colorId:number):Observable<ListResponseModel<CarDto>>{
    let newPath=this.apiUrl+"cars/getbybrandidandcolorid?brandId="+brandId+"&colorId="+colorId
    return this.httpClient.get<ListResponseModel<CarDto>>(newPath)
  }

  add(car: Car):Observable<ResponseModel>{
    let newPath = this.apiUrl + "cars/add";
    return this.httpClient.post<ResponseModel>(newPath,car);
  }

  update(car: Car):Observable<ResponseModel>{
    let newPath = this.apiUrl + "cars/update";
    return this.httpClient.post<ResponseModel>(newPath,car);
  }
}
