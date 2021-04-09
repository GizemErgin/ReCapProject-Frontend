import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarDto } from 'src/app/models/Car/carDto';
import { CarImage } from 'src/app/models/CarImage/carImage';
import { CarService } from 'src/app/services/Car/car.service';
import { CarImagesByIdService } from 'src/app/services/CarImage/car-images-by-id.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: CarDto[] = [];
  filterText="";

  constructor(
    private carService:CarService, 
    private activatedRoute:ActivatedRoute) {}

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


}
