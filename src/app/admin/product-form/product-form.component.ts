import { Component } from '@angular/core';
import { CategoryService } from '../../_services/category.service';
import { AppCategory } from '../../_models/app-category';
import { ProductService } from '../../_services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppProduct } from '../../_models/app-product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent {
  categories: AppCategory[];
  product: AppProduct = { key: '', title: '', price: 0, imageUrl: '', category: '' };
  id: string;

  constructor(categoryService: CategoryService, private productService: ProductService, private router: Router, private route: ActivatedRoute) {
    categoryService.getAll().subscribe((data) => {
      this.categories = data;
    });

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id)
      this.productService.get(this.id).subscribe((p: AppProduct) => {
        this.product = p;
      });
  }

  save(product) {
    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);

    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Are you sure to delete the product')) return;

    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }
}
