import { AppProduct } from './app-product';

export class ShoppingCartItem {
  get totalPrice() {
    return this.product.price * this.quantity;
  }

  constructor(public product: AppProduct, public quantity: number) {}
}
