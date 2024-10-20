import { Component } from '@angular/core';
import { FridgeElementComponent } from '../../_models/fridge-element/fridge-element.component';
import { FridgeModel } from '../../../models/fridge.model';
import { ApiService } from '../../../services/api.service';
import { FilterByStatePipe } from '../../../pipes/filter-by-state.pipe';
import { DeleteFridgeMenuComponent } from '../../_models/delete-fridge-menu/delete-fridge-menu.component';
import { AddingFridgeService } from '../../../services/adding-fridge.service';
import { DeleteFridgeService } from '../../../services/delete-fridge.service';

@Component({
  selector: 'app-fridge-page',
  standalone: true,
  imports: [
    FridgeElementComponent,
    FridgeElementComponent,
    FilterByStatePipe,
    DeleteFridgeMenuComponent
  ],
  templateUrl: './fridges.component.html',
  styleUrl: './fridges.component.css'
})
export class FridgesComponent {
  fridges: FridgeModel[] = [];
  sort_mode: string = '';

  constructor(
    private api: ApiService,
    private addingFridgeService: AddingFridgeService,
    private deleteFridgeService: DeleteFridgeService,
  ) {
    this.api.get_all_fridges().subscribe(resp => {
      this.fridges = resp;
    }, error => { console.log(error); });
    this.addingFridgeService.events$.subscribe((e: any) => {
      if (!e.state)
        this.api.get_all_fridges().subscribe(resp => {
          this.fridges = resp;
        }, error => { console.log(error); });
    });
    this.deleteFridgeService.events$.subscribe((e: any) => {
      if (!e.state)
        this.api.get_all_fridges().subscribe(resp => {
          this.fridges = resp;
        }, error => { console.log(error); });
    });
  }

  addFridge() {
    this.addingFridgeService.Interact();
  }
}
