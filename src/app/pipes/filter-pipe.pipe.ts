import { Pipe, PipeTransform } from '@angular/core';
import { CarDto } from '../models/Car/carDto';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(value: CarDto[], filterText:string): CarDto[] {
    filterText = filterText? filterText.toLocaleLowerCase() : "";

    return filterText? value.filter((c:CarDto)=>
    c.brandName.toLocaleLowerCase().indexOf(filterText)!==-1 || 
    c.description.toLocaleLowerCase().indexOf(filterText)!==-1 || 
    c.colorName.toLocaleLowerCase().indexOf(filterText)!==-1 ):value;
  }

}
