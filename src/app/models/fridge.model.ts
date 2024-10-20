import { ProductModel } from './product.model';
import { WishModel } from './wish.model';

export interface FridgeModel {
  id: number;
  name: string;
  owner: FridgeUserModel;
  admins: FridgeUserModel[];
  members: FridgeUserModel[];
  status: string;
  products?: ProductModel[];
  wishes: WishModel[];
}

export interface FridgeUserModel {
  id: number;
  username: string;
}
