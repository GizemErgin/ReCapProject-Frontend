import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/Brand/brand';
import { Color } from 'src/app/models/Color/color';
import { BrandService } from 'src/app/services/Brand/brand.service';
import { ColorService } from 'src/app/services/Color/color.service';

@Component({
  selector: 'app-car-filter',
  templateUrl: './car-filter.component.html',
  styleUrls: ['./car-filter.component.css']
})
export class CarFilterComponent implements OnInit {

  constructor(private brandService: BrandService,
    private colorService: ColorService) { }

  colors:Color[]=[];
  brands:Brand[]=[];
  brandIdFilter:number;
  colorIdFilter:number;

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors=response.data;
    })
  }

  selectedColor(colorId:any){
    if(this.colorIdFilter==colorId){
      return true;
    }
    else{
      return false;
    }
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands=response.data;
    })
  }

  selectedBrand(brandId:any){
    if(this.brandIdFilter==brandId){
      return true;
    }
    else{
      return false;
    }
  }

  deneme(){
    if(this.brandIdFilter){}
  }

}
