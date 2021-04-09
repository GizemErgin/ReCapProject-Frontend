import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/Brand/brand';
import { BrandService } from 'src/app/services/Brand/brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {

  brandAddForm:FormGroup;
  addBrand:Brand;

  constructor(private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private brandService:BrandService) { }

  ngOnInit(): void {
    this.createBrandAddForm();
  }

  createBrandAddForm(){
    this.brandAddForm = this.formBuilder.group({
      brandName:["", Validators.required]
    });
  }

  add(){
    if(this.brandAddForm.valid){
      let brandModel=Object.assign({}, this.brandAddForm.value)

      this.addBrand = {
        brandName: brandModel.brandName
      };
      console.log(this.addBrand);

      this.brandService.add(this.addBrand).subscribe(
        (response) =>{
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
      });
    }
    else {
      this.toastrService.error("Formunuz eksiktir. Kontrol ediniz.","Dikkat");
    }
  }
}
