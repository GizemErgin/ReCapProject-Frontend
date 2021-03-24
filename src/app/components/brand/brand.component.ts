import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Brand } from 'src/app/models/Brand/brand';
import { BrandService } from 'src/app/services/Brand/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  
  brands : Brand[] = [];
  currentBrand: Brand;

  constructor(private brandService:BrandService) {
      
  }

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
        this.brands=response.data;
    })
  }

  setCurrentBrand(brand:Brand){
    this.currentBrand=brand;
  }

  getCurrentBrandClass(brand:Brand){
    if(brand==this.currentBrand)
    {return "list-group-item active"}
    else
    {return "list-group-item"}
  }

  getAllBrandClass(){
    if(!this.currentBrand){
      return "list-group-item active"
    }else{
      return "list-group-item"
    }
  }

  setAllBrand(){
    return this.currentBrand={brandId:0, brandName:" "};
  }


}
