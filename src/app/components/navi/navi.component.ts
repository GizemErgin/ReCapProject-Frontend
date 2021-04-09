import { Component, OnInit } from '@angular/core';
import { CarDto } from 'src/app/models/Car/carDto';
import { CarService } from 'src/app/services/Car/car.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {


  title:string = 'Rent A Car';


  constructor(private carService:CarService) { }

  ngOnInit(): void {

  }

}

