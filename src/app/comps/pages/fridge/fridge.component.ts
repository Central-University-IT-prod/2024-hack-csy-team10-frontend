import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { FridgeModel, FridgeUserModel } from '../../../models/fridge.model';
import { ProductModel } from '../../../models/product.model';
import { AddingProductService } from '../../../services/adding-product.service';
import { OpenProductService } from '../../../services/open-product.service';
import { WishModel } from '../../../models/wish.model';
import { AddingMemberService } from '../../../services/adding-member.service';

@Component({
  selector: 'app-fridge',
  standalone: true,
  imports: [],
  templateUrl: './fridge.component.html',
  styleUrl: './fridge.component.css'
})
export class FridgeComponent implements OnInit {
  @ViewChild('scroll_btn') scroll_btn: any;
  products: ProductModel[] = [];
  fridge!: FridgeModel;
  option: 'products' | 'wishes' | 'members' | 'admins' = 'products';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private addingProductService: AddingProductService,
    private openProductService: OpenProductService,
    private addingMemberService: AddingMemberService,
  ) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.apiService.get_products_by_fridge(Number(id)).subscribe(resp => { this.products = resp; }, error => { console.log(error); });
    this.apiService.get_fridge_by_id(Number(id)).subscribe(resp => { this.fridge = resp; }, error => { console.log(error); });

    this.addingProductService.events$.subscribe((e: any) => {
      if (!e.state) {
        this.apiService.get_products_by_fridge(Number(id)).subscribe(resp => { this.products = resp; }, error => { console.log(error); });
        this.apiService.get_fridge_by_id(Number(id)).subscribe(resp => { this.fridge = resp; console.log(this.fridge); }, error => { console.log(error); });
      }
    });
    this.addingMemberService.events$.subscribe((e: any) => {
      if (!e.state) {
        this.apiService.get_fridge_by_id(Number(id)).subscribe(resp => { this.fridge = resp; }, error => { console.log(error); });
      }
    })
  }

  addProduct() {
    this.addingProductService.Interact(this.fridge, false);
  }

  addWish() {
    this.addingProductService.Interact(this.fridge, true);
  }

  open(product: ProductModel | WishModel, is_wish: boolean) {
    localStorage.setItem('product', JSON.stringify({product: product, is_wish: is_wish, fridge_id: this.fridge.id}));
    this.router.navigate(['/product']);
  }

  addMember(fridge: FridgeModel, admin: boolean) {
    this.addingMemberService.Interact(fridge, admin);
  }

  deleteAdmin(fridge: FridgeModel, admin: FridgeUserModel) {
    this.apiService.remove_admin_to_fridge(fridge.id, admin.id).subscribe(resp => {
      this.apiService.get_fridge_by_id(Number(fridge.id)).subscribe(resp => { this.fridge = resp; }, error => { console.log(error); });
    });
  }

  deleteMember(fridge: FridgeModel, member: FridgeUserModel) {
    this.apiService.remove_member_to_fridge(fridge.id, member.id).subscribe(resp => {
      this.apiService.get_fridge_by_id(Number(fridge.id)).subscribe(resp => { this.fridge = resp; }, error => { console.log(error); });
    });
  }

  makeAdmin(fridge: FridgeModel, member: FridgeUserModel) {
    this.apiService.add_admin_to_fridge(fridge.id, member.id).subscribe(resp => {
      this.apiService.get_fridge_by_id(Number(fridge.id)).subscribe(resp => { this.fridge = resp; }, error => { console.log(error); });
    });
  }

  findInAdmins(admins: FridgeUserModel[], member: FridgeUserModel): boolean {
    for (const admin of admins) {
      if (admin.username === member.username) return true;
    }
    return false;
  }
}
