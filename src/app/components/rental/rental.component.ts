import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarDto } from 'src/app/models/Car/carDto';
import { CustomerDto } from 'src/app/models/Customer/customerDto';
import { RentalDto } from 'src/app/models/Rental/rentalDto';
import { CarService } from 'src/app/services/Car/car.service';
import { CarDetailByIdService } from 'src/app/services/CarDetail/car-detail-by-id.service';
import { CustomerService } from 'src/app/services/Customer/customer.service';
import { RentalService } from 'src/app/services/Rental/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

  rentals:RentalDto[]=[];
  rentalsAdd:RentalDto;
  rentalsByCarId:RentalDto[]=[];
  cars:CarDto[];
  carDetails:CarDto;
  customers:CustomerDto[];
  customerDetail:CustomerDto;
  description:string;
  dailyPrice:number;
  firstName:string;
  lastName:string;
  companyName:string;
  rentDate:Date;
  returnDate:Date;
  result:number;
  

  constructor(private rentalService:RentalService, 
    private activatedRoute:ActivatedRoute,
    private carService:CarService,
    private carDetailByIdService:CarDetailByIdService,
    private customerService:CustomerService,
    private router:Router,
    ) { }


    

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["id"]){
        this.getCarsById(params["id"])
        
      }
         this.getRentals()
         this.getCars();
    
  })}

  getRentals(){
    this.rentalService.getRentals().subscribe(response=>{
      this.rentals=response.data;
    })
  }

  getCustomer(){
    this.customerService.getCustomers().subscribe(response => {
      this.customers = response.data;
      
    })
  }
  getRentDate(){
    var today  = new Date();
    //min="1980-01-01"
    today.setDate(today.getDate() + 1);
    return today.toISOString().slice(0,10)
  }
  getReturnDate(){
    var today  = new Date();
    today.setDate(today.getDate() + 2);
    return today.toISOString().slice(0,10)
  }

  createRental(){
    let MyRental:RentalDto = {
      id:this.rentalsAdd.id,
      rentDate: this.rentDate,
      returnDate: this.returnDate,
      carId: this.carDetails.id,
      modelYear: this.carDetails.modelYear,
      brandName: this.carDetails.brandName,
      description:this.carDetails.description,
      dailyPrice:this.carDetails.dailyPrice,
      firstName:this.customerDetail.firstName,
      lastName: this.customerDetail.lastName,
      companyName: this.customerDetail.companyName
      }
    this.router.navigate(['/payment/', JSON.stringify(MyRental)]);
   // this.toastr.info("Ödeme sayfasına yönlendiriliyorsunuz...", "Ödeme İşlemleri");
    
  }
  getCars(){
    this.carService.getCars().subscribe(response=>{
      this.cars=response.data;
    })
  }

  getCarsById(id:number){
    this.carDetailByIdService.getCarDetailById(id).subscribe(response=>{
      this.carDetails=response.data[0];
    })
  }

}
