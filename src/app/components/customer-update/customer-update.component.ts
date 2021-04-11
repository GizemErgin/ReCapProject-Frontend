import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerDto } from 'src/app/models/Customer/customerDto';
import { CustomerService } from 'src/app/services/Customer/customer.service';

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.css']
})
export class CustomerUpdateComponent implements OnInit {

  customerUpdateForm: FormGroup;
  updateCustomer:CustomerDto;
  customers:CustomerDto[];

  constructor(private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private customerService:CustomerService,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((response)=>{
      if(response["id"])
      {
        this.getCustomerById(response["id"]);
        this.createCustomerUpdateForm();
      }
    })
  }

  getCustomerById(id:number){
    this.customerService.getCustomerById(id).subscribe(response=>{
      this.updateCustomer=response.data;
      console.log(this.updateCustomer);

      console.log(this.updateCustomer.id);

      this.customerUpdateForm.get("id")?.setValue(this.updateCustomer.id);
      this.customerUpdateForm.get("firstName")?.setValue(this.updateCustomer.firstName);
      this.customerUpdateForm.get("lastName")?.setValue(this.updateCustomer.lastName);
      this.customerUpdateForm.get("companyName")?.setValue(this.updateCustomer.companyName); 

      console.log(this.customerUpdateForm)
    })
  }

  createCustomerUpdateForm(){
    this.customerUpdateForm=this.formBuilder.group({
      id:["",Validators.required],
      firstName:["", Validators.required],
      lastName:["", Validators.required],
      companyName:["", Validators.required]
    })
  }

  update(){
    if(this.customerUpdateForm.valid){
      let updateCustomerModel=Object.assign({},this.customerUpdateForm.value);

      console.log(updateCustomerModel);

      this.customerService.update(updateCustomerModel).subscribe(
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
