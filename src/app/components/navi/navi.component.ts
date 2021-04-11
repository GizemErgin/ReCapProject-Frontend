import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDto } from 'src/app/models/Car/carDto';
import { User } from 'src/app/models/User/user';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { CarService } from 'src/app/services/Car/car.service';
import { LocalStorageService } from 'src/app/services/LocalStorage/localstorage.service';
import { UserService } from 'src/app/services/User/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {


  title:string = 'Rent A Car';
  email = this.localStorageService.getItem('email');
  user:User;
  userName:string;
  claim:string;


  constructor(private carService:CarService,
    private authService:AuthService,
    private localStorageService:LocalStorageService,
    private toastrService:ToastrService,
    private userService:UserService,
    private router:Router) { }

  ngOnInit(): void {
    this.isLogin();
    this.checkToEmail();
    this.getClaim(this.localStorageService.getItem("user").id);
  }

 

  isLogin(){
    if(this.authService.isAuthenticated()){
      return "gizle";
    }
    else{
      return "";
    }
  }

  checkToLogin(){
    if(this.authService.isAuthenticated()){
      return true;
    }
    else{
      return false;
    }
  }

  checkToEmail(){
    if(this.localStorageService.getItem('email')){
      return true;
    }else{
      return false;
    }
  }

  logOut(){
   this.localStorageService.clean()
    this.toastrService.success("Başarıyla Çıkış Yapıldı");
    this.router.navigate(["cars"]);
    window.location.replace("http://localhost:4200/cars");

  }

  getEmail(){
    if(this.email){
      this.userService.getByEmail(this.email).subscribe(response=>{
        this.user = response.data;
      })
    }
  }

  getUser(){
    return this.localStorageService.getItem('user');
    }

    getClaim(userId:number){
      this.userService.getClaimById(userId).subscribe(response=>{
        this.claim=response.data.name;
      });
    }
  
    isAdmin(){
      if(this.claim=="admin"){
        return "";
      }
      else{
        return "gizle"
      }
    }
}

