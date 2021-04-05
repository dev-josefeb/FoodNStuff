import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { ShoppingCartService } from './shopping-cart.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  orders$: Observable<any>;

  constructor(private db: AngularFireDatabase, private cartService: ShoppingCartService) {
    this.orders$ = this.db
      .list<any>('/orders', (ref) => ref.orderByChild('datePlaced'))
      .snapshotChanges();
  }

  async placeOrder(order) {
    let result = await this.db.list('/orders').push(order);
    this.cartService.clearCart();
    return result;
  }

  getAll() {
    return this.orders$.pipe(
      map((changes) => {
        return changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }));
      })
    );
  }

  getOrderById(orderId: string) {
    return this.db.object('/orders/' + orderId).valueChanges();
  }

  getOrdersByUser(userId: string) {
    return this.db
      .list<any>('/orders', (ref) => ref.orderByChild('userId').equalTo(userId))
      .snapshotChanges()
      .pipe(
        map((changes) => {
          return changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }));
        })
      );
  }

  deleteOrder(orderId: string) {
    return this.db.object('/orders/' + orderId).remove();
  }
}
