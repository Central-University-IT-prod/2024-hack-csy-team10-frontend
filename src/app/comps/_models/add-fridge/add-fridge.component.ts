import { Component, ViewChild } from '@angular/core';
import { FridgeModel } from '../../../models/fridge.model';
import { DeleteFridgeService } from '../../../services/delete-fridge.service';
import { ApiService } from '../../../services/api.service';
import { AddingFridgeService } from '../../../services/adding-fridge.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'AddFridgeForm',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './add-fridge.component.html',
  styleUrl: './add-fridge.component.css'
})
export class AddFridgeComponent {
  @ViewChild('container') container: any;
  name: string = '';

  constructor(
    private addingFridgeService: AddingFridgeService,
    private apiService: ApiService,
  ) {}

  ngAfterViewInit() {
    this.addingFridgeService.events$.subscribe((e: any) => {
      if (e.state)
        this.Show();
      else
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
    this.addingFridgeService.Interact();
  }

  add() {
    this.apiService.create_fridge(this.name).subscribe(resp => {
      this.addingFridgeService.Interact();
    });
  }
}
