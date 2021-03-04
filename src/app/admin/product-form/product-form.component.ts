import { Component } from '@angular/core';
import { CategoryService } from '../../category.service';
import { AppCategory } from '../../models/app-category';
import { ProductService } from '../../product.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent {
  categories: AppCategory[];

  constructor(categoryService: CategoryService, private productService: ProductService) {
    categoryService
      .getCategories()
      .snapshotChanges()
      .pipe(map((changes) => changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))))
      .subscribe((data) => {
        this.categories = data;
      });
  }

  save(product) {
    this.productService.create(product);
  }
}
