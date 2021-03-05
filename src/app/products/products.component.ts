import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppProduct } from '../models/app-product';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';
import { AppCategory } from '../models/app-category';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  products: AppProduct[] = [];
  filteredProducts: AppProduct[] = [];
  subscription: Subscription;
  categories: AppCategory[];
  category: string;

  constructor(productService: ProductService, categoryService: CategoryService, route: ActivatedRoute) {
    this.subscription = productService
      .getAll()
      .snapshotChanges()
      .pipe(map((changes) => changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))))
      .subscribe((data) => {
        this.products = data;
      });

    categoryService
      .getAll()
      .snapshotChanges()
      .pipe(map((changes) => changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))))
      .subscribe((data) => {
        this.categories = data;

        // Second Observable has to be here, otherwise empty product page intitialised in the beginning (async)
        route.queryParamMap.subscribe((params) => {
          this.category = params.get('category');

          this.filteredProducts = this.category ? this.products.filter((p) => p.category === this.category) : this.products;
        });
      });
  }
}
