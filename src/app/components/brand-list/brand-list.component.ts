import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/Brand/brand';
import { BrandService } from 'src/app/services/Brand/brand.service';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent implements OnInit {

  dataLoaded=false;
  brands:Brand[];
  constructor(private brandService:BrandService) { }

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
        this.brands=response.data;
        this.dataLoaded=response.success;
    })
  }
}
