import { Component, OnInit } from '@angular/core';
import{FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms"
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/Brand/brand';
import { Car } from 'src/app/models/Car/car';
import { CarImage } from 'src/app/models/CarImage/carImage';
import { Color } from 'src/app/models/Color/color';
import { BrandService } from 'src/app/services/Brand/brand.service';
import { CarService } from 'src/app/services/Car/car.service';
import { ColorService } from 'src/app/services/Color/color.service';


@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  carAddForm: FormGroup;
  addCar:Car;
  brands: Brand[];
  colors: Color[];

  constructor(
    private formBuilder: FormBuilder,
    private toastrService:ToastrService,
    private carService:CarService,
    private brandService:BrandService,
    private colorService:ColorService) { }

  ngOnInit(): void {
    this.createCarAddForm();
    this.getBrands();
    this.getColors();
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands=response.data;
    })
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors=response.data;
    })
  }


  createCarAddForm(){
    this.carAddForm = this.formBuilder.group({
      brandId:["",Validators.required],
      colorId:["",Validators.required],
      modelYear:["",Validators.required],
      dailyPrice:["",Validators.required],
      description:["",Validators.required],
      findeks:["",Validators.required],
      carImage:[null]
    })
  }

  add(){
    if(this.carAddForm.valid){
      let carModel = Object.assign({},this.carAddForm.value);

      this.addCar = {
        brandId: carModel.brandId,
        colorId: carModel.colorId,
        modelYear: carModel.modelYear,
        dailyPrice: carModel.dailyPrice,
        description: carModel.description,
        findeks: carModel.findeks,
      };
      console.log(carModel);
      console.log(this.addCar)

      this.carService.add(carModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, "Başarılı");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        },
        (responseError)=>{
          console.log(responseError);
          if(responseError.error.ValidationErrors.length>0){
            for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
              this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,"Doğrulama Hatası");
            }
          }
        }
        );
    }
    else{this.toastrService.error("Formunuz eksiktir. Kontrol ediniz.","Dikkat");
  }
  }
}
