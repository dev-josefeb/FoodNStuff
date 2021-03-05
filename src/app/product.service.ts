import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AppProduct } from './models/app-product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private db: AngularFireDatabase) {}

  create(product) {
    return this.db.list('/products').push(product);
  }

  getAll(): AngularFireList<AppProduct> {
    return this.db.list('/products');
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
