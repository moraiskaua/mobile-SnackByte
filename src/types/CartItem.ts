import { ProductType } from './Product';

export interface CartItem {
  product: ProductType;
  quantity: number;
}
