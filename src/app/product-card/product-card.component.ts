import { Component, Input } from '@angular/core';
import { AppProduct } from '../models/app-product';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input('product') product: AppProduct;
  @Input('show-actions') showActions: boolean = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private cartService: ShoppingCartService) {}

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }

  getQuantity() {
    if (!this.shoppingCart || !this.shoppingCart.itemsMap) return 0;

    let item = this.shoppingCart.itemsMap[this.product.key];
    return item ? item.quantity : 0;
  }
}
