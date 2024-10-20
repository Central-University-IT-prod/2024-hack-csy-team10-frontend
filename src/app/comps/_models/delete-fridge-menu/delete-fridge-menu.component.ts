import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { DeleteFridgeService } from '../../../services/delete-fridge.service';
import { FridgeModel } from '../../../models/fridge.model';
import { FridgesComponent } from '../../pages/fridges/fridges.component';
import { ApiService } from '../../../services/api.service';
import { UserModel } from '../../../models/user.model';

@Component({
  selector: 'DeleteFridgeMenu',
  standalone: true,
  imports: [],
  templateUrl: './delete-fridge-menu.component.html',
  styleUrl: './delete-fridge-menu.component.css'
})
export class DeleteFridgeMenuComponent implements AfterViewInit {
  @ViewChild('container') container: any;
  fridge?: FridgeModel;

  constructor(
    private deleteFridgeService: DeleteFridgeService,
    private apiService: ApiService,
  ) {}

  ngAfterViewInit() {
    this.deleteFridgeService.events$.subscribe((e: any) => {
      if (e.state) {
        this.Show();
        this.fridge = e.fridge;
      } else
        this.Hide();
    })
  }

  Show() {
    this.container.nativeElement.style.display = 'flex';
    setTimeout(() => {
      this.container.nativeElement.style.opacity = '1';
    });
  }

  Hide() {
    this.container.nativeElement.style.opacity = '0';
    setTimeout(() => {
      this.container.nativeElement.style.display = 'none';
    }, 300);
  }

  cancel() {
    this.deleteFridgeService.Interact();
  }

  delete() {
    this.apiService.delete_fridge(this.fridge?.id!).subscribe(resp => {
      this.deleteFridgeService.Interact();
    }, error => { console.log(error); });
  }
}
