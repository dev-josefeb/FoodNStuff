import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppProduct } from '../models/app-product';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: AppProduct[] = [];
  filteredProducts: AppProduct[] = [];
  category: string;
  cart: any;
  subscription: Subscription;

  constructor(private productService: ProductService, private route: ActivatedRoute, private cartService: ShoppingCartService) {
    this.populateProducts();
  }

  async ngOnInit() {
    this.subscription = (await this.cartService.getCart()).subscribe((cart) => {
      this.cart = cart;
      console.log('Logging cart', cart);
    });
  }

  private populateProducts() {
    this.productService
      .getAll()
      .pipe(
        switchMap((products) => {
          this.products = products;
          return this.route.queryParamMap;
        })
      )
      .subscribe((params) => {
        this.category = params.get('category');
        this.applyFilter();
      });
  }

  private applyFilter() {
    this.filteredProducts = this.category ? this.products.filter((p) => p.category === this.category) : this.products;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
