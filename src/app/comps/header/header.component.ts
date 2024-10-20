import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SideMenuService } from '../../services/side-menu.service';

@Component({
  selector: 'HeaderComp',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild('moving_line') moving_line: any;

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
    this.moving_line.nativeElement.style.width = '30px';
  }

  Close() {
    this.moving_line.nativeElement.style.width = '18px';
  }

  Interact() {
    this.sideMenuService.Interact();
  }
}
