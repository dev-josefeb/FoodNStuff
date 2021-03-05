import { Component, OnDestroy } from '@angular/core';
import { AppProduct } from '../../models/app-product';
import { ProductService } from '../../product.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent implements OnDestroy {
  products: AppProduct[];
  filteredProducts: AppProduct[];
  subscription: Subscription;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private productService: ProductService) {
    this.subscription = productService
      .getAll()
      .snapshotChanges()
      .pipe(map((changes) => changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))))
      .subscribe((data) => {
        this.filteredProducts = this.products = data;
        this.dtTrigger.next();
      });

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };
  }

  filter(query: string) {
    this.filteredProducts = query ? this.products.filter((p: AppProduct) => p.title.toLowerCase().includes(query.toLowerCase())) : this.products;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.dtTrigger.unsubscribe();
  }
}
