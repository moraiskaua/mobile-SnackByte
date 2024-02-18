import { ProductType } from './Product';

export interface CartItemType {
  product: ProductType;
  quantity: number;
}
