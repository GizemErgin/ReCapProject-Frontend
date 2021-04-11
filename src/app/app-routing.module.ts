import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorListComponent } from './components/color-list/color-list.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerAddComponent } from './components/customer-add/customer-add.component';
import { CustomerUpdateComponent } from './components/customer-update/customer-update.component';
import { CustomerComponent } from './components/customer/customer.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalListComponent } from './components/rental-list/rental-list.component';
import { RentalComponent } from './components/rental/rental.component';
import { UserComponent } from './components/user/user.component';
import { LoginGuard } from './guards/login.guard';


const routes: Routes = [
  { path: 'rentals', component: RentalComponent },
  { path: 'rentalslist', component: RentalListComponent},
  { path: 'customers', component: CustomerComponent },
  { path: 'customers/add', component: CustomerAddComponent },
  { path: 'customers/update/:id', component: CustomerUpdateComponent, canActivate:[LoginGuard] },
  { path: 'cars', component: CarComponent },
  {path:"cars/brand/:brandId", component:CarComponent},
  {path:"cars/color/:colorId", component:CarComponent},
  {path:"cars/car-detail/:id", component:CarDetailComponent},
  {path:"cars/filter/:brandId/:colorId",component:CarComponent},
  {path:"cars/rental/:id",component:RentalComponent, canActivate:[LoginGuard] },
  { path: 'brands', component: BrandComponent },
  { path: 'colors', component: ColorComponent },
  { path: 'payments', component: PaymentComponent },
  { path: 'carslist', component: CarListComponent },
  { path: 'cars/add', component: CarAddComponent, canActivate:[LoginGuard] },
  { path: 'cars/update/:id', component: CarUpdateComponent, canActivate:[LoginGuard] },
  { path: 'brandslist', component: BrandListComponent },
  { path: 'brands/add', component: BrandAddComponent, canActivate:[LoginGuard] },
  { path: 'brands/update/:brandId', component: BrandUpdateComponent },
  { path: 'colorslist', component: ColorListComponent },
  { path: 'colors/add', component: ColorAddComponent, canActivate:[LoginGuard] },
  { path: 'colors/update/:colorId', component: ColorUpdateComponent, canActivate:[LoginGuard] },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: UserComponent },

  { path: '**', redirectTo: 'cars', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
