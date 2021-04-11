import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/Customer/customer';
import { User } from 'src/app/models/User/user';
import { CustomerService } from 'src/app/services/Customer/customer.service';
import { LocalStorageService } from 'src/app/services/LocalStorage/localstorage.service';
import { UserService } from 'src/app/services/User/user.service';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {

  addCustomer:Customer;
  customerAddForm: FormGroup;
  users:User;

  companyName:string;

  constructor(private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private userService:UserService,
    private customerService:CustomerService,
    private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
    this.createCustomerAddForm();
    this.getUserById(this.localStorageService.getItem("id"));
  }

  getUserById(userId:number){
    this.userService.getUserById(userId).subscribe(response=>{
      this.users=response.data;
      console.log(this.users);

      this.customerAddForm.get("userId")?.setValue(this.users.id);
      this.customerAddForm.get("companyName")?.setValue(this.companyName);
      this.customerAddForm.get("findeks")?.setValue(0);

      console.log(this.customerAddForm)
    })
  }

  createCustomerAddForm(){
    this.customerAddForm=this.formBuilder.group({
      userId:["",Validators.required],
      companyName:[""],
      findeks:["", Validators.required],
    })
  }

  add(){
    if(this.customerAddForm.valid){
      let customerModel=Object.assign({}, this.customerAddForm.value)

      this.addCustomer = {
        userId:customerModel.userId,
        companyName:customerModel.companyName,
        findeks:customerModel.findeks,
      };

      this.customerService.add(this.addCustomer).subscribe(
        (response) =>{
          this.toastrService.success(response.message, "Başarılı");
          setTimeout(() => {
            window.location.replace("http://localhost:4200/cars");
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
