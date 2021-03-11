import { Component, Input } from '@angular/core';
import { AppCategory } from '../../models/app-category';

@Component({
  selector: 'category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.css'],
})
export class CategoryCardComponent {
  @Input('category') category: AppCategory;
  loading: boolean = true;

  constructor() {}

  onLoad() {
    this.loading = false;
  }
}
