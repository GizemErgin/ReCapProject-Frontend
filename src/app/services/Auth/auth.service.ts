import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from 'src/app/models/Auth/loginModel';
import { RegisterModel } from 'src/app/models/Auth/registerModel';
import { TokenModel } from 'src/app/models/Auth/tokenModel';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper: JwtHelperService =new JwtHelperService();
  apiUrl = "https://localhost:44316/api/"

  constructor(private httpClient:HttpClient) { }

  login(loginModel:LoginModel){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"auth/login",loginModel);
  }

  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }
    else{
      return false;
    }
  }

  register(registerModel:RegisterModel){
    return this.httpClient.post<SingleResponseModel<RegisterModel>>(this.apiUrl+"auth/register",registerModel);
  }

  
  getUserName(){
    return this.jwtHelper.decodeToken(localStorage.getItem("token")?.toString())["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
  }


}
