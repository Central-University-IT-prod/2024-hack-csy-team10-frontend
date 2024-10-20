import { Component, ViewChild } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { ApiService } from '../../../services/api.service';
import { AddingProductService } from '../../../services/adding-product.service';
import { FridgeModel } from '../../../models/fridge.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'AddProduct',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  @ViewChild('container') container: any;
  name: string = '';
  finish_time: string = '';
  count: number = 0;
  fridge?: FridgeModel;
  is_wish: boolean = false;

  constructor(
    private addingProductService: AddingProductService,
    private apiService: ApiService,
  ) {}

  ngAfterViewInit() {
    this.addingProductService.events$.subscribe((e: any) => {
      this.fridge = e.fridge;
      this.is_wish = e.is_wish;
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
    this.addingProductService.Interact();
  }

  add() {
    if (this.is_wish) {
      this.apiService.create_wish(this.name, Number(this.fridge?.id!), this.count).subscribe(resp => {
        this.addingProductService.Interact();
      });
    } else {
      const time = new Date(this.finish_time);

      function format(num: number) {
        if (num < 10) return '0' + num;
        return num;
      }

      let time_str = '';
      if (this.finish_time !== '')
        time_str = `${ time.getFullYear() }-${ format(time.getMonth()) }-${ format(time.getDay()) }T${ format(time.getHours()) }:${ format(time.getMinutes()) }:${ format(time.getSeconds()) }`
      this.apiService.create_product(this.name, Number(this.fridge?.id!), time_str, this.count).subscribe(resp => {
        this.addingProductService.Interact();
      });
    }
  }
}
