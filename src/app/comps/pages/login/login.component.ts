import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(
    private api: ApiService,
    private router: Router
  ) {}

  send_form() {
    this.api.login(this.username, this.password).subscribe(resp => {
      localStorage.setItem('user_token', resp.auth_token);
      this.router.navigate(['/profile']);
    }, error => { console.log(error); })
  }
}
