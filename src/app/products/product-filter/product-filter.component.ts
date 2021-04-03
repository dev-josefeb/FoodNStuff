import { trigger, transition, query, stagger, animateChild, style, animate, useAnimation, group } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { bounceOutLeftAnimation } from '../../animations';
import { CategoryService } from '../../category.service';
import { AppCategory } from '../../models/app-category';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css'],
  animations: [
    trigger('todosAnimation', [transition(':enter', group([query('@todoAnimation', stagger(100, animateChild()))]))]),

    trigger('todoAnimation', [transition(':enter', [style({ opacity: 0 }), animate(300)]), transition(':leave', [style({ backgroundColor: 'tomato' }), animate(1000), useAnimation(bounceOutLeftAnimation)])]),
  ],
})
export class ProductFilterComponent {
  @Input('category') category;
  @Input('is-horizontal') isHorizontal;
  categories: AppCategory[];

  constructor(private categoryService: CategoryService) {
    this.categoryService.getAll().subscribe((data) => {
      this.categories = data;
    });
  }
}
