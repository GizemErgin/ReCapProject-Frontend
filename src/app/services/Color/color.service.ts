import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from 'src/app/models/Color/color';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';


@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrl="https://localhost:44316/api/"
  constructor(private httpClient:HttpClient) {   }

  getColors():Observable<ListResponseModel<Color>>{
    let newPath:string=this.apiUrl+"colors/getall"
      return this.httpClient.get<ListResponseModel<Color>>(newPath);
  }

  getColorById(colorId:number):Observable<SingleResponseModel<Color>>{
    let newPath:string=this.apiUrl+"colors/getbycolorid?colorId="+colorId;
      return this.httpClient.get<SingleResponseModel<Color>>(newPath);
  }

  add(color:Color):Observable<ResponseModel>{
    let newPath:string = this.apiUrl+"colors/add"
    return this.httpClient.post<ResponseModel>(newPath,color);
  }

  update(color:Color):Observable<ResponseModel>{
    let newPath:string = this.apiUrl+"colors/update"
    return this.httpClient.post<ResponseModel>(newPath,color);
  }
}
