import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppProduct } from '../models/app-product';
import { ProductService } from '../product.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: AppProduct[];
  subscription: Subscription;

  constructor(productService: ProductService) {
    this.subscription = productService
      .getAll()
      .snapshotChanges()
      .pipe(map((changes) => changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))))
      .subscribe((data) => {
        this.products = data;
      });
  }
  ngOnInit(): void {}
}
