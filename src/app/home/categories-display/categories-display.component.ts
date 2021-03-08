import { Component } from '@angular/core';
import { CategoryService } from '../../category.service';
import { AppCategory } from '../../models/app-category';

@Component({
  selector: 'categories-display',
  templateUrl: './categories-display.component.html',
  styleUrls: ['./categories-display.component.css'],
})
export class CategoriesDisplayComponent {
  categories: AppCategory[];

  constructor(private categoryService: CategoryService) {
    this.categoryService.getAll().subscribe((data) => {
      this.categories = data;
    });
  }
}
