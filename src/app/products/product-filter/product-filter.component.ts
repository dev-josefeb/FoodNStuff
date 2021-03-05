import { Component, Input } from '@angular/core';
import { CategoryService } from '../../category.service';
import { AppCategory } from '../../models/app-category';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css'],
})
export class ProductFilterComponent {
  @Input('category') category;
  categories: AppCategory[];

  constructor(private categoryService: CategoryService) {
    this.categoryService.getAll().subscribe((data) => {
      this.categories = data;
    });
  }
}
