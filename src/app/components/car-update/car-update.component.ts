import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/Brand/brand';
import { Car } from 'src/app/models/Car/car';
import { CarDto } from 'src/app/models/Car/carDto';
import { Color } from 'src/app/models/Color/color';
import { BrandService } from 'src/app/services/Brand/brand.service';
import { CarService } from 'src/app/services/Car/car.service';
import { ColorService } from 'src/app/services/Color/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  carUpdateForm: FormGroup;
  updateCar:Car;
  brands: Brand[];
  colors: Color[];

  constructor( private formBuilder: FormBuilder,
    private toastrService:ToastrService,
    private carService:CarService,
    private brandService:BrandService,
    private colorService:ColorService,
    private activatedRoute:ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((response)=>{
      if(response["id"])
      {
        this.getCarDetailById(response["id"]);
        this.createCarUpdateForm();
        this.getBrands();
        this.getColors();
      }
    })
  }

  getCarDetailById(id:number){
    this.carService.getCarsById(id).subscribe(response=>{
      this.updateCar = response.data;

      this.carUpdateForm.get("id")?.setValue(this.updateCar.id);
      this.carUpdateForm.get("brandId")?.setValue(this.updateCar.brandId);
      this.carUpdateForm.get("colorId")?.setValue(this.updateCar.colorId);
      this.carUpdateForm.get("modelYear")?.setValue(this.updateCar.modelYear);
      this.carUpdateForm.get("dailyPrice")?.setValue(this.updateCar.dailyPrice);
      this.carUpdateForm.get("description")?.setValue(this.updateCar.description);
    })
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


  createCarUpdateForm(){
    this.carUpdateForm = this.formBuilder.group({
      id:["",Validators.required],
      brandId:["",Validators.required],
      colorId:["",Validators.required],
      modelYear:["",Validators.required],
      dailyPrice:["",Validators.required],
      description:["",Validators.required],
    })
  }

  update(){
    if(this.carUpdateForm.valid){
      let updateCarModel= Object.assign({},this.carUpdateForm.value);
      
      console.log(updateCarModel);

      this.carService.update(updateCarModel).subscribe(
        (response)=>{
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
    else{
      this.toastrService.error("Formunuz eksiktir. Kontrol ediniz.","Dikkat");
    }
  }

}
