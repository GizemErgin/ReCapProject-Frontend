import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from 'src/app/models/Brand/brand';
import { Color } from 'src/app/models/Color/color';
import { BrandService } from 'src/app/services/Brand/brand.service';
import { ColorService } from 'src/app/services/Color/color.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  
  brands : Brand[] = [];
  currentBrand: Brand;

  colors: Color[] = [];
  currentColor: Color;
  
  constructor(private brandService:BrandService, 
    private colorService:ColorService,
    private router: Router,
  ) { }


  ngOnInit(): void {
        this.getBrands();
        this.getColors();
  }


  //Brand
  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
        this.brands=response.data;
    })
  }

  setCurrentBrand(brand:Brand){
    this.currentBrand=brand;
    let brandId = this.currentBrand.brandId;
    this.router.navigate(["cars/brand/"+brandId]);
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
    return this.currentBrand={brandId:0, brandName:""};
  }

  //Color
  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }
  setCurrentColor(color: Color) {
    this.currentColor = color;
    let colorId = this.currentColor.colorId;
    this.router.navigate(["cars/color/"+colorId]);
  }

  getCurrentColorClass(color: Color) {
    if (color == this.currentColor) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }

  getAllColorClass() {
    if (!this.currentColor) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }

  setAllColor() {
    return (this.currentColor = { colorId: 0, colorName:""});
  }


}

