import { AppProduct } from './app-product';
import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
  items: ShoppingCartItem[] = [];

  constructor(private itemsMap: { [productId: string]: ShoppingCartItem }) {
    this.itemsMap = itemsMap || {};

    for (let productId in itemsMap) {
      let item = itemsMap[productId];
      this.items.push(new ShoppingCartItem({ ...item, key: productId }));
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
      sum += this.items[productId].totalPrice;
    }
    return sum;
  }

  getQuantity(product: AppProduct) {
    let item = this.itemsMap[product.key];
    return item ? item.quantity : 0;
  }
}
