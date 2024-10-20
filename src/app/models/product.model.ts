import { FridgeModel } from './fridge.model';

export interface ProductModel {
  id: number;
  start_date: string;
  end_date: string;
  name: string;
  count: number;
  fridge: FridgeModel
}
