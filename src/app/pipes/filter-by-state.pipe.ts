import { Pipe, PipeTransform } from '@angular/core';
import { FridgeModel } from '../models/fridge.model';

@Pipe({
  name: 'filterByState',
  standalone: true
})
export class FilterByStatePipe implements PipeTransform {

  transform(items: FridgeModel[], stateMode: string): any[] {
    if (!items || !stateMode || stateMode === '') {
      return items;
    }
    return items.filter(item => item.status === stateMode);
  }

}
