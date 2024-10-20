import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SideMenuService {
  public observer = new Subject();
  public events$ = this.observer.asObservable();
  public state: boolean = false;

  constructor() { }

  Interact() {
    this.state = !this.state;
    this.observer.next({state: this.state});
  }
}
