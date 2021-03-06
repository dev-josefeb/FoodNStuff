import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
  constructor(public items: ShoppingCartItem[]) {}

  get totalItemsCount() {
    let itemsCount = 0;
    for (let productId in this.items) {
      itemsCount += this.items[productId].quantity;
    }

    return itemsCount;
  }
}
