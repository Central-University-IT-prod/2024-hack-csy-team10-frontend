import { AfterViewInit, Component } from '@angular/core';
import { SideMenuService } from '../../services/side-menu.service';

@Component({
  selector: 'SideBar',
  standalone: true,
  imports: [],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent implements AfterViewInit {
  constructor(
    private sideMenuService: SideMenuService,
  ) {}

  ngAfterViewInit() {
    this.sideMenuService.events$.subscribe((e: any) => {
      if (e.state) this.Open();
      else this.Close();
    });
  }

  Open() {

  }

  Close() {

  }
}
