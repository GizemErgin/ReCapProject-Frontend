import { Component, OnInit } from '@angular/core';
import { CarDto } from 'src/app/models/Car/carDto';
import { CarService } from 'src/app/services/Car/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: CarDto[] = [];

  constructor(private carService:CarService) {}

  ngOnInit(): void {
    this.getCars();
  }

  getCars() {
      this.carService.getCars().subscribe(response=>{
        this.cars=response.data;
      });
  }
}
