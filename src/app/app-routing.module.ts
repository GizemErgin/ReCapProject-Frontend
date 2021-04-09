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
import { CustomerComponent } from './components/customer/customer.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RentalListComponent } from './components/rental-list/rental-list.component';
import { RentalComponent } from './components/rental/rental.component';


const routes: Routes = [
  { path: 'rentals', component: RentalComponent },
  { path: 'rentalslist', component: RentalListComponent},
  { path: 'customers', component: CustomerComponent },
  { path: 'cars', component: CarComponent },
  {path:"cars/brand/:brandId", component:CarComponent},
  {path:"cars/color/:colorId", component:CarComponent},
  {path:"cars/car-detail/:id", component:CarDetailComponent},
  {path:"cars/filter/:brandId/:colorId",component:CarComponent},
  {path:"cars/rental/:id",component:RentalComponent},
  { path: 'brands', component: BrandComponent },
  { path: 'colors', component: ColorComponent },
  { path: 'payments', component: PaymentComponent },
  { path: 'carslist', component: CarListComponent },
  { path: 'cars/add', component: CarAddComponent },
  { path: 'cars/update/:id', component: CarUpdateComponent },
  { path: 'brandslist', component: BrandListComponent },
  { path: 'brands/add', component: BrandAddComponent },
  { path: 'brands/update/:brandId', component: BrandUpdateComponent },
  { path: 'colorslist', component: ColorListComponent },
  { path: 'colors/add', component: ColorAddComponent },
  { path: 'colors/update/:colorId', component: ColorUpdateComponent },
  { path: '**', redirectTo: 'cars', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
