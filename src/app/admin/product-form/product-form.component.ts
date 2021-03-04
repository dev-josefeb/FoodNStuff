import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { CategoryService } from '../../category.service';
import { AppCategory } from '../../models/app-category';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  categories: AppCategory[];

  constructor(categoryService: CategoryService) {
    categoryService
      .getCategories()
      .snapshotChanges()
      .pipe(map((changes) => changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))))
      .subscribe((data) => {
        this.categories = data;
      });
  }

  ngOnInit(): void {}
}
