import { Component } from '@angular/core';
import { AppProduct } from '../../models/app-product';
import { ProductService } from '../../product.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent {
  products: AppProduct[];

  constructor(private productService: ProductService) {
    productService
      .getAll()
      .snapshotChanges()
      .pipe(map((changes) => changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))))
      .subscribe((data) => {
        this.products = data;
        console.log('Products are ', data);
      });
  }
}
