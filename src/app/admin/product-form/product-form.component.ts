import { Component } from '@angular/core';
import { CategoryService } from '../../category.service';
import { AppCategory } from '../../models/app-category';
import { ProductService } from '../../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppProduct } from '../../models/app-product';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent {
  categories: AppCategory[];
  product: AppProduct = { title: '', price: 0, imageUrl: '', category: '' };
  id: string;

  constructor(private categoryService: CategoryService, private productService: ProductService, private router: Router, private route: ActivatedRoute) {
    categoryService
      .getCategories()
      .snapshotChanges()
      .pipe(map((changes) => changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))))
      .subscribe((data) => {
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
