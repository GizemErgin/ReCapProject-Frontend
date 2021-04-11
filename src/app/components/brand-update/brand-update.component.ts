import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/Brand/brand';
import { BrandService } from 'src/app/services/Brand/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {

  brandUpdateForm: FormGroup;
  updateBrand:Brand;
  brands:Brand[];

  constructor(private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private brandService:BrandService,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((response)=>{
      if(response["brandId"])
      {
        this.getBrandById(response["brandId"]);
        this.createBrandUpdateForm();
        this.getBrands();
      }
    })
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands=response.data;
    })
  }

  getBrandById(brandId:number){
    this.brandService.getBrandById(brandId).subscribe(response=>{
      this.updateBrand=response.data;

      console.log(this.updateBrand)
      console.log(this.updateBrand.brandId)

      this.brandUpdateForm.get("brandId")?.setValue(this.updateBrand.brandId);
      this.brandUpdateForm.get("brandName")?.setValue(this.updateBrand.brandName);

      console.log(this.brandUpdateForm)
    })
  }

  createBrandUpdateForm(){
    this.brandUpdateForm=this.formBuilder.group({
      brandId:["",Validators.required],
      brandName:["", Validators.required]
    })
  }

  update(){
    if(this.brandUpdateForm.valid){
      let updateBrandModel=Object.assign({},this.brandUpdateForm.value);

      console.log(updateBrandModel);

      this.brandService.update(updateBrandModel).subscribe(
        (response)=>{
          this.toastrService.success(response.message,"Başarılı")
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        },
      (responseError)=>{
        console.log(responseError);
        if(responseError.error.ValidationErrors.lengh>0){
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
