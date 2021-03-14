import { Component, HostListener, OnInit } from '@angular/core';
import { AppProduct } from '../models/app-product';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: AppProduct[] = [];
  filteredProducts: AppProduct[] = [];
  category: string;
  cart$: Observable<ShoppingCart>;
  screenWidth: any;
  breakpointXL = 1980;

  constructor(private productService: ProductService, private route: ActivatedRoute, private cartService: ShoppingCartService) {}

  async ngOnInit() {
    this.screenWidth = window.innerHeight;
    this.cart$ = await this.cartService.getCart();
    this.populateProducts();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth = window.innerWidth;
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
}
