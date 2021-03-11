import { Component, Input, OnInit } from '@angular/core';
import { AppCategory } from '../../models/app-category';

@Component({
  selector: 'category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.css'],
})
export class CategoryCardComponent implements OnInit {
  @Input('category') category: AppCategory;
  constructor() {}

  ngOnInit(): void {}
}
