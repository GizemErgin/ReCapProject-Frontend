import { Component, OnInit } from '@angular/core';
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
  
  brands:Brand[];
  colors:Color[];
  
  constructor(private brandService:BrandService, private colorService:ColorService) { }

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
        this.brands=response.data;
    })
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
        this.colors=response.data;
    })
  }
}
