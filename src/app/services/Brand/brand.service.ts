import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Brand } from 'src/app/models/Brand/brand';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';




@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl = "https://localhost:44316/api/"
  constructor(private httpClient:HttpClient) { }

  getBrands():Observable<ListResponseModel<Brand>>{
      let newPath:string=this.apiUrl+"brands/getall"
      return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }

  getBrandById(brandId:number):Observable<SingleResponseModel<Brand>>{
    let newPath:string=this.apiUrl+"brands/getbybrandid?brandId="+brandId;
    return this.httpClient.get<SingleResponseModel<Brand>>(newPath);
  }

  add(brand:Brand):Observable<ResponseModel>{
    let newPath:string = this.apiUrl+"brands/add"
    return this.httpClient.post<ResponseModel>(newPath,brand);
  }

  update(brand:Brand):Observable<ResponseModel>{
    let newPath:string = this.apiUrl+"brands/update"
    return this.httpClient.post<ResponseModel>(newPath,brand);
  }
}
