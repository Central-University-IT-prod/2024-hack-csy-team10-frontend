import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private api: ApiService,
    private router: Router,
  ) {}

  send_form() {
    if (this.email.length < 5 || this.password.length < 5 || this.username.length < 5) return;
    this.api.register(this.email, this.username, this.password).subscribe(resp => {
        this.api.login(this.username, this.password).subscribe(resp => {
          localStorage.setItem('user_token', resp.auth_token);
          this.router.navigate(['/profile']);
        }, error => { console.log(error); })
      }, error => { console.log(error);
    })
  }
}
