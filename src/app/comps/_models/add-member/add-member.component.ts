import { Component, ViewChild } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { FormsModule } from '@angular/forms';
import { AddingMemberService } from '../../../services/adding-member.service';
import { FridgeModel } from '../../../models/fridge.model';

@Component({
  selector: 'AddMember',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './add-member.component.html',
  styleUrl: './add-member.component.css'
})
export class AddMemberComponent {
  @ViewChild('container') container: any;
  name: string = '';
  admin: boolean = false;
  fridge!: FridgeModel;
  response = '';

  constructor(
    private addingMemberService: AddingMemberService,
    private apiService: ApiService,
  ) {}

  ngAfterViewInit() {
    this.addingMemberService.events$.subscribe((e: any) => {
      this.fridge = e.fridge;
      this.admin = e.admin;
      if (e.state)
        this.Show();
      else
        this.Hide();
    })
  }

  Show() {
    this.container.nativeElement.style.display = 'flex';
    setTimeout(() => {
      this.container.nativeElement.style.opacity = '1';
    });
  }

  Hide() {
    this.container.nativeElement.style.opacity = '0';
    setTimeout(() => {
      this.container.nativeElement.style.display = 'none';
    }, 300);
  }

  cancel() {
    this.addingMemberService.Interact();
  }

  add() {
    let username: string = '';
    let email: string = '';

    if (this.name.split('@').length === 2)
      email = this.name
    else
      username = this.name;

    this.apiService.add_member_to_fridge(this.fridge.id, username, email).subscribe(resp => {
      this.name = '';
      this.response = '';
      this.addingMemberService.Interact();
    }, error => {
      this.response = error.error.error;
    });
  }
}
