import { ShoppingCart } from './shopping-cart';

export class Order {
  datePlaced: number;
  items: any[];
  finalPrice: number;
  itemCount: number;
  generatedId: string;

  constructor(public userId: string, public billing: any, cart: ShoppingCart) {
    this.datePlaced = new Date().getTime();
    billing.cardNumber = this.maskNumber(billing.cardNumber);

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
    this.generatedId = this.setUniqueId(4);
  }

  setUniqueId(parts: number): string {
    const stringArr = [];
    for (let i = 0; i < parts; i++) {
      const S4 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      stringArr.push(S4);
    }
    return stringArr.join('-').toUpperCase();
  }

  maskNumber(number: any): string {
    return number.slice(-4).padStart(number.length, '*');
  }
}
