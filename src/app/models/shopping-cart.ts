import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
  items: ShoppingCartItem[] = [];

  constructor(public itemsMap: { [productId: string]: ShoppingCartItem }) {
    for (let productId in itemsMap) this.items.push(itemsMap[productId]);
  }

  get totalItemsCount() {
    let itemsCount = 0;
    for (let productId in this.itemsMap) {
      itemsCount += this.itemsMap[productId].quantity;
    }

    return itemsCount;
  }
}
