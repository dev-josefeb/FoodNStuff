import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppProduct } from '../models/app-product';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';
import { AppCategory } from '../models/app-category';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  products: AppProduct[] = [];
  filteredProducts: AppProduct[] = [];
  categories: AppCategory[];
  category: string;

  constructor(private productService: ProductService, private categoryService: CategoryService, private route: ActivatedRoute) {
    this.populateProducts();
    this.populateCategories();
  }

  private populateProducts() {
    this.productService
      .getAll()
      .snapshotChanges()
      .pipe(map((changes) => changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))))
      .subscribe((data) => {
        this.products = data;

        this.populateFilteredProducts();
      });
  }

  private populateFilteredProducts() {
    this.route.queryParamMap.subscribe((params) => {
      this.category = params.get('category');

      this.filteredProducts = this.category ? this.products.filter((p) => p.category === this.category) : this.products;
    });
  }

  private populateCategories() {
    this.categoryService
      .getAll()
      .snapshotChanges()
      .pipe(map((changes) => changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))))
      .subscribe((data) => {
        this.categories = data;
      });
  }
}
