import { AppPage } from '../../../e2e/src/app.po';
import { AppProduct } from './app-product';
import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
  items: ShoppingCartItem[] = [];

  constructor(public itemsMap: { [productId: string]: ShoppingCartItem }) {
    this.itemsMap = itemsMap || {};
    for (let productId in itemsMap) {
      let item = this.itemsMap[productId];
      let x = new ShoppingCartItem();
      Object.assign(x, item);
      x.key = productId;

      this.items.push(x);
    }
  }

  get totalItemsCount() {
    let itemsCount = 0;

    for (let productId in this.items) {
      itemsCount += this.items[productId].quantity;
    }
    return itemsCount;
  }

  get totalPrice(): number {
    let sum = 0;
    for (let productId in this.items) {
      sum += this.items[productId].price * this.items[productId].quantity;
    }
    return sum;
  }

  getQuantity(product: AppProduct) {
    let item = this.itemsMap[product.key];
    return item ? item.quantity : 0;
  }
}
