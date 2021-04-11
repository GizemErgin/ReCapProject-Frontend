import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/Brand/brand';
import { CarDto } from 'src/app/models/Car/carDto';
import { CarImage } from 'src/app/models/CarImage/carImage';
import { BrandService } from 'src/app/services/Brand/brand.service';
import { CarService } from 'src/app/services/Car/car.service';
import { CustomerService } from 'src/app/services/Customer/customer.service';
import { LocalStorageService } from 'src/app/services/LocalStorage/localstorage.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})

export class CarComponent implements OnInit {

  cars: CarDto[] = [];
  filterText="";
  carId:number;

  constructor(
    private carService:CarService, 
    private activatedRoute:ActivatedRoute,
    private localStorageService:LocalStorageService,
    private toastrService:ToastrService,
    private customerService:CustomerService,
    private router:Router) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"]){
        this.getCarsByBrand(params["brandId"])
      }
      if(params["colorId"])
      {
        this.getCarsByColor(params["colorId"])
      }
      if(params["brandId"] && params["colorId"])
      {
        this.getCarsByBrandAndColor(params["brandId"],params["colorId"])
      }
      else{
        this.getCars();
      }
    })
    this.getCustomerByUserId();
  }

  getCars() {
      this.carService.getCars().subscribe(response=>{
        this.cars=response.data;
      });
  }

  getCarsByBrand(brandId:number) {
    this.carService.getCarsByBrandId(brandId).subscribe(response=>{
      this.cars=response.data;
    });
}

  getCarsByColor(colorId:number) {
  this.carService.getCarsByColorId(colorId).subscribe(response=>{
    this.cars=response.data;
  });
}

  getCarsByBrandAndColor(brandId:number,colorId:number) {
  this.carService.getCarsByBrandIdandColorId(brandId,colorId).subscribe(response=>{
    this.cars=response.data;
  });
}

getCustomerByUserId(){
  this.customerService.getCustomerDetailByUserId(this.localStorageService.getItem("id")).subscribe(response=>{
    if(response.data == null){
      this.localStorageService.setItem("deneme",false);
    }
    else{
      this.localStorageService.setItem("deneme",true);
    }
  })

}

isCustomer(){
  if(this.localStorageService.getItem("deneme")==false){
    this.toastrService.info("Müşteri kayıt işlemleri tamamlanmamış görünüyor.", "Yönlendirme");
    this.router.navigate(['/customers/add']);
  }
}

}
