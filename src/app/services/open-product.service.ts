import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductModel } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class OpenProductService {
  public observer = new Subject();
  public events$ = this.observer.asObservable();
  public state: boolean = false;

  constructor() { }

  emit_data(product: ProductModel, is_wish: boolean=false) {
    this.observer.next({product: product, is_wish: is_wish})
  }
}
