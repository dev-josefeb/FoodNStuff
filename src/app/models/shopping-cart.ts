import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
  items: ShoppingCartItem[] = [];

  constructor(public itemsMap: { [productId: string]: ShoppingCartItem }) {
    for (let productId in itemsMap) {
      let item = this.itemsMap[productId];
      this.items.push(new ShoppingCartItem(item.product, item.quantity));
    }
  }

  get totalItemsCount() {
    let itemsCount = 0;

    for (let productId in this.items) {
      itemsCount += this.items[productId].quantity;
    }
    return itemsCount;
  }
}
