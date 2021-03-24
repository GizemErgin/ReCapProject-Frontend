import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Brand } from 'src/app/models/Brand/brand';
import { ListResponseModel } from 'src/app/models/listResponseModel';




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
}
