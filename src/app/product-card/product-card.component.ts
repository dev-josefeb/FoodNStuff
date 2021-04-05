import { Component, Input } from '@angular/core';
import { AppProduct } from '../_models/app-product';
import { ShoppingCart } from '../_models/shopping-cart';
import { ShoppingCartService } from '../_services/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input('product') product: AppProduct;
  @Input('show-actions') showActions: boolean = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;
  imageLoading: boolean = true;

  constructor(private cartService: ShoppingCartService) {}

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  onLoad() {
    this.imageLoading = false;
  }
}
