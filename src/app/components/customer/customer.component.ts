import { Component, OnInit } from '@angular/core';
import { CustomerDto } from 'src/app/models/Customer/customerDto';
import { CustomerService } from 'src/app/services/Customer/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customers:CustomerDto[]=[];
  constructor(private customerServise:CustomerService) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers(){
    this.customerServise.getCustomers().subscribe(response=>{
      this.customers=response.data;
    })
  }

}
