import { Component, Input, ViewChild } from '@angular/core';
import { FridgeModel } from '../../../models/fridge.model';
import { DeleteFridgeMenuComponent } from '../delete-fridge-menu/delete-fridge-menu.component';
import { RouterLink } from '@angular/router';
import { DeleteFridgeService } from '../../../services/delete-fridge.service';

@Component({
  selector: 'FridgeCard',
  standalone: true,
  imports: [
    DeleteFridgeMenuComponent,
    RouterLink
  ],
  templateUrl: './fridge-element.component.html',
  styleUrl: './fridge-element.component.css'
})
export class FridgeElementComponent {
  @Input() fridge: FridgeModel = {
    id: 1,
    name: 'Холодильник в школе',
    owner: { id: 0, username: 'Джон' },
    admins: [],
    members: [],
    status: 'Владелец',
    products: [],
    wishes: [],
  }

  constructor(
    private deleteFridgeService: DeleteFridgeService,
  ) {}

  showDeleteMenu() {
    this.deleteFridgeService.Interact(this.fridge);
  }
}
