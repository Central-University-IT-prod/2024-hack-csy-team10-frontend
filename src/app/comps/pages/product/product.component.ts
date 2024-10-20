import { Component } from '@angular/core';
import { OpenProductService } from '../../../services/open-product.service';
import { ProductModel } from '../../../models/product.model';
import { Router } from '@angular/router';
import { WishModel } from '../../../models/wish.model';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  product!: Partial<ProductModel & WishModel>;
  is_wish!: boolean;
  fridge!: number;

  constructor(
    private openProductService: OpenProductService,
    private router: Router,
    private apiService: ApiService,
  ) {
    this.product = JSON.parse(localStorage.getItem('product')!).product;
    this.is_wish = JSON.parse(localStorage.getItem('product')!).is_wish
    this.fridge = JSON.parse(localStorage.getItem('product')!).fridge_id
  }

  ozonRoute() {
    window.location.href = `https://www.ozon.ru/search/?text=${this.product.name}`;
  }

  wildberriesRoute() {
    window.location.href = `https://www.wildberries.ru/catalog/0/search.aspx?search=${this.product.name}`
  }

  yandexRoute() {
    window.location.href = `https://lavka.yandex.ru/search?text=${this.product.name}`
  }

  parseDate(date: string) {
    const time = new Date(date);

    function parse(n: number) {
      if (n<10) return '0'+n;
      return n;
    }

    return `${parse(time.getDay())}.${parse(time.getMonth())}.${time.getFullYear()}`;
  }

  increment() {
    console.log(this.product.id);
    this.apiService.increase_product(this.fridge, this.product.id!).subscribe(resp => {
      this.product.count!++;
      localStorage.setItem('product', JSON.stringify({product: this.product, is_wish: this.is_wish, fridge_id: this.fridge}));
    }, error => { console.log(error); })
  }

  decrement() {
    this.apiService.decrease_product(this.fridge, this.product.id!).subscribe(resp => {
      this.product.count!--;
      localStorage.setItem('product', JSON.stringify({product: this.product, is_wish: this.is_wish, fridge_id: this.fridge}));
      if (this.product.count === 0)
        this.router.navigate(['/fridges']);
    }, error => { console.log(error); })
  }

  remove_wish() {
    this.apiService.remove_wish(this.product.id!).subscribe(resp => {
      this.router.navigate(['/fridges'])
    }, error => { console.log(error); })
  }
}
