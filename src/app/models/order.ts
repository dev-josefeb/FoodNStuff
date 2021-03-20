import { ShoppingCart } from './shopping-cart';

export class Order {
  datePlaced: number;
  items: any[];
  finalPrice: number;
  itemCount: number;

  constructor(public userId: string, public billing: any, cart: ShoppingCart) {
    this.datePlaced = new Date().getTime();

    this.items = cart.items.map((i) => {
      return {
        product: {
          title: i.title,
          imageUrl: i.imageUrl,
          price: i.price,
        },
        quantity: i.quantity,
        totalPrice: i.totalPrice,
      };
    });

    this.finalPrice = cart.totalPrice;
    this.itemCount = cart.totalItemsCount;
  }
}
