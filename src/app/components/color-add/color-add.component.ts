import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/Color/color';
import { ColorService } from 'src/app/services/Color/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {

  colorAddForm:FormGroup;
  addColor:Color;

  constructor(private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private colorService:ColorService) { }

  ngOnInit(): void {
    this.createColorAddForm();
  }

  createColorAddForm(){
    this.colorAddForm = this.formBuilder.group({
      colorName:["", Validators.required]
    });
  }

  add(){
    if(this.colorAddForm.valid){
      let colorModel=Object.assign({}, this.colorAddForm.value)

      this.addColor = {
        colorName: colorModel.colorName
      };
      console.log(this.addColor);

      this.colorService.add(this.addColor).subscribe(
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
