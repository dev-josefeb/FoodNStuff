import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { AppProduct } from '../../models/app-product';
import { ProductService } from '../../product.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent implements OnDestroy, AfterViewInit {
  products: AppProduct[];
  subscription: Subscription;
  displayedColumns: string[] = ['imageUrl', 'title', 'category', 'price', 'actions'];
  dataSource = new MatTableDataSource<AppProduct>();
  imageLoading: boolean = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(productService: ProductService) {
    this.subscription = productService.getAll().subscribe((data) => {
      this.dataSource.data = this.products = data;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  filter(query: string) {
    this.dataSource.data = query ? this.products.filter((p: AppProduct) => p.title.toLowerCase().includes(query.toLowerCase())) : this.products;
  }

  onLoad() {
    this.imageLoading = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
