import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenModel } from 'src/app/models/Auth/tokenModel';
import { Claim } from 'src/app/models/Claim/claim';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { User } from 'src/app/models/User/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = "https://localhost:44316/api/users/"

  constructor(private httpClient:HttpClient) { }
 

  update(userUpdateModel: User): Observable<SingleResponseModel<TokenModel>> {
    let newPath = this.apiUrl + 'edit';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath, userUpdateModel);
 }
 
 getUserById(userId: number): Observable<SingleResponseModel<User>> {
  let newPath = this.apiUrl+'getbyuserid?userId='+userId;
  return this.httpClient.get<SingleResponseModel<User>>(newPath);
}

  
 getByEmail(email:string):Observable<SingleResponseModel<User>>{
  let newPath = this.apiUrl+'getbyemail?email='+email;
  return this.httpClient.get<SingleResponseModel<User>>(newPath);
}

getClaimById(userId:number):Observable<SingleResponseModel<Claim>>{
  let newPath = this.apiUrl+'getclaimsbyuserid?userId='+userId;
  return this.httpClient.get<SingleResponseModel<Claim>>(newPath);
}

}