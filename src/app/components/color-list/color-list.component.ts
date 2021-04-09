import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/Color/color';
import { ColorService } from 'src/app/services/Color/color.service';

@Component({
  selector: 'app-color-list',
  templateUrl: './color-list.component.html',
  styleUrls: ['./color-list.component.css']
})
export class ColorListComponent implements OnInit {

  dataLoaded=false;
  colors:Color[];
  constructor(private colorService:ColorService) { }

  ngOnInit(): void {
    this.getColors();
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
        this.colors=response.data;
        this.dataLoaded=response.success;
    })
  }

}
