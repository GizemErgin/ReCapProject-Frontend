import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/Customer/customer';
import { CustomerDto } from 'src/app/models/Customer/customerDto';
import { User } from 'src/app/models/User/user';
import { CustomerService } from 'src/app/services/Customer/customer.service';
import { LocalStorageService } from 'src/app/services/LocalStorage/localstorage.service';
import { UserService } from 'src/app/services/User/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  editProfileForm: FormGroup;
  editCustomerForm: FormGroup;
  password: FormControl;
  email: string;
  user: User;
  customer: Customer;

  constructor(
    private userService: UserService,
    private customerService: CustomerService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createProfileAddForm();
    this.createCustomerAddForm();
    this.user = this.localStorageService.getItem('user');
    this.email = this.localStorageService.getItem('email');
    this.getUser();
    this.getCustomer();
  }

  createProfileAddForm() {
    this.editProfileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  createCustomerAddForm() {
    this.editCustomerForm = this.formBuilder.group({
      companyName: [''],
      findeks:["",Validators.required]
    });
  }

  getUser() {
    if (this.user) {
      this.userService.getUserById(this.user.id).subscribe(
        (response) => {
         
          this.user = response.data;
          this.editProfileForm.setValue({
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            email: this.user.email,
            password: '',
          });
        },
        (responseError) => {
          this.toastrService.error(responseError.error);
        }
      );
    }
  }


  updateProfil() {
    if (this.editProfileForm.valid) {
      let profileModel = Object.assign({}, this.editProfileForm.value);
      profileModel.id = this.user.id;
      this.userService.update(profileModel).subscribe(
        (response) => {
          this.toastrService.success(response.message);
          this.router.navigate(['/cars']);
        },
        (responseError) => {
          this.toastrService.error(responseError.error);
        }
      );
    } else {
      this.toastrService.error('Hata');
    }
  }
  logOut() {
    this.localStorageService.clean();
    this.router.navigate(['/cars']);
  }

  getCustomer() {
    this.customerService.getCustomerByUserId(this.user.id).subscribe(
      (response) => {
        console.log(response)
        this.customer = response.data;

        this.editCustomerForm.get("companyName")?.setValue(response.data.companyName)
        this.editCustomerForm.get("findeks")?.setValue(response.data.findeks)
        
      },
      (responseError) => {
        //this.toastrService.error(responseError.error);
      }
    );
  }
  userCustomerCheck(){
    if (this.customer==null) {
      return false
    } else {
      return true
    }
  }


  updateCustomer() {
    if (this.editCustomerForm.valid) {
      let customerModel = Object.assign({}, this.editCustomerForm.value);

      customerModel.findeks=this.customer.findeks;
      customerModel.companyName=this.customer.companyName;
      this.customerService.update(customerModel).subscribe(
        (response) => {
          this.toastrService.success(response.message);
          this.router.navigate(['/cars']);
        },
        (responseError) => {
          this.toastrService.error(responseError.error);
        }
      );
    } else {
      this.toastrService.error('Hata');
    }
  }
  refresh(){
    window.location.reload();
   }


  }
