import { trigger, transition, query, style, animate, stagger, animateChild, group, useAnimation } from '@angular/animations';
import { bounceOutLeftAnimation } from '../animations';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../shopping-cart.service';
import { AppProduct } from '../models/app-product';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
  animations: [
    trigger('todosAnimation', [transition(':enter', group([query('@todoAnimation', stagger(200, animateChild()))]))]),

    trigger('todoAnimation', [transition(':enter', [style({ opacity: 0 }), animate(1500)]), transition(':leave', [style({ backgroundColor: 'tomato' }), animate(1000), useAnimation(bounceOutLeftAnimation)])]),

    trigger('exitAnimation', [transition(':leave', [style({ backgroundColor: 'tomato' }), animate(1000), useAnimation(bounceOutLeftAnimation)])]),

    trigger('fadeAnimation', [transition(':enter', [style({ opacity: 0 }), animate(1000)])]),
    ,
  ],
})
export class ShoppingCartComponent implements OnInit {
  cart$: Observable<ShoppingCart>;

  constructor(private cartService: ShoppingCartService) {}

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
  }

  clearCart() {
    this.cartService.clearCart();
  }

  identify(index, item) {
    return item.title;
  }

  addToCart(product: AppProduct) {
    this.cartService.addToCart(product);
  }

  removeFromCart(product: AppProduct) {
    this.cartService.removeFromCart(product);
  }
}
