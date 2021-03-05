import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AppProduct } from './models/app-product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products$: Observable<any>;

  constructor(private db: AngularFireDatabase) {
    this.products$ = this.db.list('/products').snapshotChanges();
  }

  create(product) {
    return this.db.list('/products').push(product);
  }

  getAll(): Observable<AppProduct[]> {
    return this.products$.pipe(
      map((changes) => {
        return changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }));
      })
    );
  }

  get(productId: string) {
    return this.db.object('/products/' + productId).valueChanges();
  }

  update(productId: string, product: AppProduct) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId: string) {
    return this.db.object('/products/' + productId).remove();
  }
}
