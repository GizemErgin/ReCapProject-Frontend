import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/Car/car';
import { CarDto } from 'src/app/models/Car/carDto';
import { CarService } from 'src/app/services/Car/car.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  dataLoaded=false;
  cars:CarDto[];

  constructor( private carService:CarService) {}

  ngOnInit(): void {
    this.getCars();
  }

  getCars(){
    this.carService.getCars().subscribe(response=>{
      this.cars=response.data;
      this.dataLoaded=response.success;
    })
  }
}
