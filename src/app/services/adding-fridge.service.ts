import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FridgeModel } from '../models/fridge.model';

@Injectable({
  providedIn: 'root'
})
export class AddingFridgeService {
  public observer = new Subject();
  public events$ = this.observer.asObservable();
  public state: boolean = false;

  constructor() { }

  Interact() {
    this.state = !this.state;
    this.observer.next({state: this.state});
  }
}
