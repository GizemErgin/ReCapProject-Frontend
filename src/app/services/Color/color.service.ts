import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from 'src/app/models/Color/color';
import { ListResponseModel } from 'src/app/models/listResponseModel';


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
}
