import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/Color/color';
import { ColorService } from 'src/app/services/Color/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {

  colorUpdateForm: FormGroup;
  updateColor:Color;
  colors:Color[];

  constructor(private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private colorService:ColorService,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((response)=>{
      if(response["colorId"])
      {
        this.getColorById(response["colorId"]);
        this.createColorUpdateForm();
        this.getColors();
      }
    })
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors=response.data;
    })
  }

  getColorById(colorId:number){
    this.colorService.getColorById(colorId).subscribe(response=>{
      this.updateColor=response.data;

      this.colorUpdateForm.get("colorId")?.setValue(this.updateColor.colorId);
      this.colorUpdateForm.get("colorName")?.setValue(this.updateColor.colorName);
    })
  }

  createColorUpdateForm(){
    this.colorUpdateForm=this.formBuilder.group({
      colorId:["",Validators.required],
      colorName:["", Validators.required]
    })
  }

  update(){
    if(this. colorUpdateForm.valid){
      let updateColorModel=Object.assign({},this.colorUpdateForm.value);

      console.log(updateColorModel);

      this.colorService.update(updateColorModel).subscribe(
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
