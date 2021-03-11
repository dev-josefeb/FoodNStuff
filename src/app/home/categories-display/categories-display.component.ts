import { Component } from '@angular/core';
import { CategoryService } from '../../category.service';
import { AppCategory } from '../../models/app-category';
import { trigger, transition, query, style, animate, stagger, animateChild, group, useAnimation } from '@angular/animations';

@Component({
  selector: 'categories-display',
  templateUrl: './categories-display.component.html',
  styleUrls: ['./categories-display.component.css'],
  animations: [
    trigger('todosAnimation', [transition(':enter', group([query('@todoAnimation', stagger(200, animateChild())), query('@todoAnimation', stagger(200, animateChild()))]))]),

    // TodoAnimation for the child element
    trigger('todoAnimation', [transition(':enter', [style({ opacity: 0 }), animate(1500)])]),
  ],
})
export class CategoriesDisplayComponent {
  categories: AppCategory[];

  constructor(private categoryService: CategoryService) {
    this.categoryService.getAll().subscribe((data) => {
      this.categories = data;
    });
  }
}
