import { BinaryOperatorExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDto } from 'src/app/models/Car/carDto';
import { Payment } from 'src/app/models/Payment/payment';
import { Rental } from 'src/app/models/Rental/rental';
import { CarService } from 'src/app/services/Car/car.service';
import { CarDetailByIdService } from 'src/app/services/CarDetail/car-detail-by-id.service';
import { PaymentService } from 'src/app/services/Payment/payment.service';
import { RentalService } from 'src/app/services/Rental/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  payments: Payment[];
  carDetail: CarDto[];
  addPayment: Payment;
  addRental: Rental;
  rentalCarDetail: Rental;

  carBrandName: string;
  carModelYear: number;
  cardDate: string;

  paymentAddForm: FormGroup;

  totalPaye: number;
  check: boolean;
  checked: boolean;

  returnPayAddMessage: string;

  constructor(private paymentService: PaymentService,
    private formBuilder: FormBuilder,
    private router: Router,
    private rentalService: RentalService,
    private carDetailService: CarDetailByIdService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.rentalCarDetail = this.paymentService.getRental();
    this.totalPaye = this.paymentService.getRentalTotalPaye();
    this.createPaymentAddForm();
    if ((this.rentalCarDetail === undefined) || (this.totalPaye <= 0)) {
      this.router.navigate(['/cars']);
      //this.toastrService.error("Araç listesine yönlendiriliyorsunuz", "Hatalı işlem");
    }
    console.log(this.rentalCarDetail);
    console.log(this.totalPaye);
    this.getCarDetailById(this.rentalCarDetail.carId);
  }

  getCarDetailById(carId: number) {
    this.carDetailService.getCarDetailById(carId).subscribe((response) => {
      this.carDetail = response.data;
      this.carBrandName = this.carDetail[0].brandName;
      this.carModelYear = this.carDetail[0].modelYear;
    });
  }

  createPaymentAddForm() {
    this.paymentAddForm = this.formBuilder.group({
      cardNameSurname: ["", Validators.required],
      cardNumber: ["", Validators.required],
      cardDateMonth: ["", Validators.required],
      cardDateYear: ["", Validators.required],
      cardCvv: ["", Validators.required],
    })
  }

  add() {
    if (this.paymentAddForm.valid) {
      let paymentModel = Object.assign({}, this.paymentAddForm.value);
      this.cardDate = paymentModel.cardDateMonth.toString() + "/" + paymentModel.cardDateYear.toString();

      if ((paymentModel.cardNameSurname === undefined) || (!paymentModel.cardNameSurname)) {
        this.toastrService.warning('Kart Sahibi bilgisini kontrol ediniz.');
      }
      else if ((paymentModel.cardNumber === undefined) || (!paymentModel.cardNumber)) {
        this.toastrService.warning('Kart Numarası bilgisini kontrol ediniz.');
      }
      else if ((paymentModel.cardDateMonth === undefined) || (!paymentModel.cardDateMonth)) {
        this.toastrService.warning('Tarih Ay bilgisini kontrol ediniz.');
      }
      else if ((paymentModel.cardDateYear === undefined) || (!paymentModel.cardDateYear)) {
        this.toastrService.warning('Tarih Yıl bilgisini kontrol ediniz.');
      }
      else if ((paymentModel.cardCvv === undefined) || (!paymentModel.cardCvv)) {
        this.toastrService.warning('CVV bilgisini kontrol ediniz.');
      }
      else {
        this.addPayment = {
          carId:this.rentalCarDetail.carId,
          cardNameSurname: paymentModel.cardNameSurname,
          cardNumber: paymentModel.cardNumber,
          cardExpiryDate: this.cardDate,
          cardCvv: paymentModel.cardCvv,
          totalPaye: this.totalPaye
        };        

        console.log(paymentModel);
        console.log(this.addPayment)

        this.paymentService.addPayment(this.addPayment).subscribe(
          (response) => {
            this.toastrService.success(response.message, "Başarılı");
            console.log(this.rentalCarDetail);

            this.addRental ={
              carId:this.rentalCarDetail.carId,
              customerId:this.rentalCarDetail.customerId,
              rentDate:this.rentalCarDetail.rentDate,
              estReturnDate:this.rentalCarDetail.estReturnDate,
            }

            this.rentalService.addRental(this.addRental).subscribe(
              (response2)=>
               {
                this.toastrService.success(response2.message.toString(), "Kiralama Başarılı");
                this.router.navigate(['/rentalslist']);
               },
               (responseError2)=>
               {
                this.toastrService.error('Kiralama İşlemi Yapılamadı.', 'Kiralama Başarısız');
                console.log(responseError2);
               }
            );
            // setTimeout(() => {
            //   window.location.reload();
            // }, 2000);
          },
          (responseError) => {
            console.log(responseError);
            if (responseError.error.ValidationErrors.length > 0) {
              for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
                this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage, "Doğrulama Hatası");
              }
            }

          }
        );

      }

    }
  }

  // setCheck(){
  //     this.bayrak+=1;
  //     if(this.bayrak==1)
  //     {
  //       this.bayrak=1;
  //     }  
  //     else{
  //       this.bayrak=0;
  //     }
  // }

  // controlCheck(check:boolean){

  //   if(this.bayrak==1){
  //     this.checked=true;
  //   }
  //   else{
  //     this.checked=false;
  //   }
  // }
  }

