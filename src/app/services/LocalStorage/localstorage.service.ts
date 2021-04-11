import { Injectable } from '@angular/core';
import { CarDto } from 'src/app/models/Car/carDto';
import { Customer } from 'src/app/models/Customer/customer';
import { User } from 'src/app/models/User/user';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  customer: string = 'customer';
  user: string = 'user';
  car:string="car"

  constructor() {}

  setItem(key: string, object: any) {
    localStorage.setItem(key, JSON.stringify(object));
  }
  getItem(key: string) {
    return JSON.parse(localStorage.getItem(key)!);
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }
  clean() {
    localStorage.clear();
  }
  getUser(): User {
    return JSON.parse(localStorage.getItem(this.user)!);
  }
  getCustomer(): Customer {
    return JSON.parse(localStorage.getItem(this.customer)!);
  }
  getCar():CarDto{
    return JSON.parse(localStorage.getItem(this.car)!)
  }
}