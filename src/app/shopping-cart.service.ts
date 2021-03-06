import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AppProduct } from './models/app-product';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime(),
    });
  }

  async getCart(): Promise<Observable<any>> {
    let cartId = await this.getOrCreateCartId();
    return this.db
      .object('/shopping-carts/' + cartId)
      .snapshotChanges()
      .pipe(
        map((action: any) => {
          return action.payload.val().items;
        })
      );
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  async addToCart(product: AppProduct) {
    this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: AppProduct) {
    this.updateItemQuantity(product, -1);
  }

  private async updateItemQuantity(product: AppProduct, increment: number) {
    const cartId = await this.getOrCreateCartId();
    const item = this.getItem(cartId, product.key);

    item
      .snapshotChanges()
      .pipe(take(1))
      .subscribe((i: any) => {
        const quantity = (i.payload.exists() ? i.payload.val().quantity : 0) + increment;
        item.update({ product: product, quantity: quantity });
      });
  }
}
