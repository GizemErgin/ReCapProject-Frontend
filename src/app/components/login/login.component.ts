import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { User } from 'src/app/models/User/user';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { CustomerService } from 'src/app/services/Customer/customer.service';
import { LocalStorageService } from 'src/app/services/LocalStorage/localstorage.service';
import { UserService } from 'src/app/services/User/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: User;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router:Router,
    private userService:UserService,
    private localStorageService:LocalStorageService,
    private customerService:CustomerService
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  

  login() {
    if (this.loginForm.valid) {
      let loginModel = Object.assign({}, this.loginForm.value);

      this.authService.login(loginModel).subscribe(
        (response) => {
          console.log(response);
          this.toastrService.info(response.message, 'Bilgi');
          localStorage.setItem('token', response.data.token);
          this.getUserByEmail(loginModel.email);

          setTimeout(() => {
            this.toastrService.info("Müşteri işlemlerini tamamlamak için yönlendiriliyorsunuz.", "Bilgi");
            window.location.replace("http://localhost:4200/customers/add");
          }, 2000)

        },
        (responseError) => {
          console.log(responseError);
            this.toastrService.error(responseError.error,"Bilgi");
        }
      );
    }
  }

  getUserByEmail(email: string) {
    this.userService.getByEmail(email).subscribe(response => {
       this.user = response.data;
       this.localStorageService.setItem("user",this.user);
       this.localStorageService.setItem("id",this.user.id);
       this.localStorageService.setItem("email",this.user.email);
    });
 }
}
