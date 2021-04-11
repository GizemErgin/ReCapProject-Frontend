import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDto } from 'src/app/models/Car/carDto';
import { CarImage } from 'src/app/models/CarImage/carImage';
import { RentalDto } from 'src/app/models/Rental/rentalDto';
import { CarDetailByIdService } from 'src/app/services/CarDetail/car-detail-by-id.service';
import { CarImagesByIdService } from 'src/app/services/CarImage/car-images-by-id.service';
import { CustomerService } from 'src/app/services/Customer/customer.service';
import { LocalStorageService } from 'src/app/services/LocalStorage/localstorage.service';
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
    private customerService:CustomerService,
    private localStorageService:LocalStorageService,
    private toastrService:ToastrService,
    private router:Router,
    
    
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
