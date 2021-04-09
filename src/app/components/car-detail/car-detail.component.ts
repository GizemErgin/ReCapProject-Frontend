import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDto } from 'src/app/models/Car/carDto';
import { CarImage } from 'src/app/models/CarImage/carImage';
import { RentalDto } from 'src/app/models/Rental/rentalDto';
import { CarDetailByIdService } from 'src/app/services/CarDetail/car-detail-by-id.service';
import { CarImagesByIdService } from 'src/app/services/CarImage/car-images-by-id.service';
import { RentalService } from 'src/app/services/Rental/rental.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})

export class CarDetailComponent implements OnInit {

  carDetails:CarDto;
  carImages:CarImage[]=[];
  rentalsByCarId:RentalDto[];
  rentals:RentalDto[];
  
  constructor(
    private carDetailByIdService:CarDetailByIdService,
    private carImagesByIdService:CarImagesByIdService,
    private activatedRoute:ActivatedRoute,
    private rentalService:RentalService,
    
    
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["id"]){
        this.getCarsById(params["id"])
        this.getImagesById(params["id"])
        this.getRentalsByCarId(params["id"])
        
      }
      this.getRentals()
  })
}

  getCarsById(id:number){
    this.carDetailByIdService.getCarDetailById(id).subscribe(response=>{
      this.carDetails=response.data[0];
    })
  }
  getImagesById(id:number){
    this.carImagesByIdService.getCarImagesById(id).subscribe(response=>{
      this.carImages=response.data;
      
    })
  }
  getRentals(){
    this.rentalService.getRentals().subscribe(response=>{
      this.rentals=response.data;
    })
  }

  getRentalsByCarId(id:number){
    this.rentalService.getRentalsByCarId(id).subscribe(response=>{
      this.rentalsByCarId=response.data;
    })
  }
 
  check(id:number){ //service yaz ve backend yaz ve html kısmını ekle
   this.rentals.find(function(element){
     if(element.carId===id && element.returnDate===null){
       return false //arac kiralanamaz
     }
     else{
       return true //kiralanabilir
     }

   })
  }

}
