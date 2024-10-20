import { AfterViewInit, Component, Renderer2 } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './comps/header/header.component';
import { SideBarComponent } from './comps/side-bar/side-bar.component';
import { filter } from 'rxjs';
import { DeleteFridgeMenuComponent } from './comps/_models/delete-fridge-menu/delete-fridge-menu.component';
import { AddFridgeComponent } from './comps/_models/add-fridge/add-fridge.component';
import { AddProductComponent } from './comps/_models/add-product/add-product.component';
import { AddMemberComponent } from './comps/_models/add-member/add-member.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SideBarComponent, DeleteFridgeMenuComponent, AddFridgeComponent, AddProductComponent, AddMemberComponent],
  template: `
    <HeaderComp/>

    <div class="content">
      <router-outlet/>
      <SideBar/>
      <DeleteFridgeMenu/>
      <AddFridgeForm/>
      <AddProduct/>
      <AddMember/>
    </div>
  `,
  styles: `
    .content {
      width:  100vw;
      min-height: calc(100vh - var(--header-height));
      background: var(--background-secondary);
    }
  `
})
export class AppComponent implements AfterViewInit {
  title = 'prodHack';

  constructor(
    private router: Router,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit() {
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe(() => {
      if (this.router.url === '/login' || this.router.url === '/register') {
        document.documentElement.style.setProperty("--header-height", "0");
      } else
        document.documentElement.style.setProperty("--header-height", "80px");
    });
  }
}
