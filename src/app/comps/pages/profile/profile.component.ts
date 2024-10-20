import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import { UserModel } from '../../../models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  profile: UserModel = { username: '', email: '' };

  constructor(
    private api: ApiService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.api.get_profile().subscribe(resp => {
      this.profile = resp[0];
    }, error => {
      this.router.navigate(['/login']).then().catch();
    });
  }

  logout() {
    this.api.logout().subscribe(resp => {
      this.router.navigate(['/login']).then().catch();
    }, error => { this.router.navigate(['/login']); });
  }
}
