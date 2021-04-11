import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDto } from 'src/app/models/Car/carDto';
import { CustomerDto } from 'src/app/models/Customer/customerDto';
import { Rental } from 'src/app/models/Rental/rental';
import { RentalDto } from 'src/app/models/Rental/rentalDto';
import { CarDetailByIdService } from 'src/app/services/CarDetail/car-detail-by-id.service';
import { CustomerService } from 'src/app/services/Customer/customer.service';
import { LocalStorageService } from 'src/app/services/LocalStorage/localstorage.service';
import { PaymentService } from 'src/app/services/Payment/payment.service';
import { RentalService } from 'src/app/services/Rental/rental.service';
import { UserService } from 'src/app/services/User/user.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

  rentals: RentalDto[] = [];
  rentalsByCarId: RentalDto[] = [];
  carDetails: CarDto;
  customers: CustomerDto[];
  customerDetail: CustomerDto;

  customerId: number;
  rentDate: Date;
  estReturnDate: Date;
  totalPaye: number;

  constructor(private rentalService: RentalService,
    private activatedRoute: ActivatedRoute,
    private carDetailByIdService: CarDetailByIdService,
    private customerService: CustomerService,
    private router: Router,
    private paymentService: PaymentService,
    private toastrService: ToastrService,
  ) { }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["id"]) {
        this.getCarsById(params["id"])
      }
      this.getRentals();
      this.getCustomer();
    })
  }

  getRentals() {
    this.rentalService.getRentals().subscribe(response => {
      this.rentals = response.data;
    })
  }

  getCustomer() {
    this.customerService.getCustomers().subscribe(response => {
      this.customers = response.data;
      console.log(this.customers)
    })
  }
  getRentDate() {
    var today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().slice(0, 10)
  }
  getReturnDate() {
    var today = new Date();
    today.setDate(today.getDate() + 2);
    return today.toISOString().slice(0, 10)
  }


  getCarsById(id: number) {
    this.carDetailByIdService.getCarDetailById(id).subscribe(response => {
      this.carDetails = response.data[0];
    })
  }

  createRental() {
    let MyRental: Rental = {
      carId: this.carDetails.id,
      rentDate: this.rentDate,
      estReturnDate: this.estReturnDate,
      customerId: parseInt(this.customerId.toString())
    }

    console.log(this.customerId);
    this.customerService.getCustomerById(this.customerId).subscribe(response=>{    

    if(response.data.findeks>=this.carDetails.findeks){
      this.toastrService.success("Findeks puanınız kiralama işlemi için uygundur.","Başarılı");

      this.rentalService.checkCarStatus(MyRental).subscribe(
        (response) => {
          this.toastrService.success(response.message.toString(), 'Tarihler Uygun');
          var date1 = new Date(this.estReturnDate.toString());
          var date2 = new Date(this.rentDate.toString());
          var difference = date1.getTime() - date2.getTime();
          var numberOfDays = Math.ceil(difference / (1000 * 3600 * 24));
          this.totalPaye = numberOfDays * (this.carDetails.dailyPrice + (this.carDetails.dailyPrice * 18 / 100));
  
          this.paymentService.setRentalCar(MyRental, this.totalPaye);
  
          console.log(MyRental);
          console.log(this.totalPaye);
          setTimeout(() => {
            this.toastrService.info("Ödeme sayfasına yönlendiriliyorsunuz...", "Ödeme İşlemleri");
            this.router.navigate(['/payments']);
          }, 2000)
        },
        (responseError)=>
        {
          this.toastrService.error(responseError.error.message,"Hata");
        }
      );
    }
    else{
      this.toastrService.error("Findeks puanınız kiralama işlemi için uygun değildir, uygun bir araç seçiniz.","Hata");
    }
  });

  }
}
