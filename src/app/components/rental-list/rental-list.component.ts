import { Component, OnInit } from '@angular/core';
import { RentalDto } from 'src/app/models/Rental/rentalDto';
import { RentalService } from 'src/app/services/Rental/rental.service';

@Component({
  selector: 'app-rental-list',
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.css']
})
export class RentalListComponent implements OnInit {

  dataLoaded=false;
  rentals:RentalDto[];
  constructor(private rentalService:RentalService) { }

  ngOnInit(): void {
    this.getRentals();
  }

  getRentals(){
    this.rentalService.getRentals().subscribe(response=>{
      this.rentals=response.data;
      this.dataLoaded=response.success;
    })
  }
}
