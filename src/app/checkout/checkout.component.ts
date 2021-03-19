import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../shopping-cart.service';
import { CountryService } from '../country.service';
import { OrderService } from '../order.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { Order } from '../models/order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  billing = {};
  cart: ShoppingCart;
  countries: string[] = [];
  userId: string;
  cartSubscription: Subscription;
  userSubscription: Subscription;

  constructor(private authService: AuthService, private cartService: ShoppingCartService, private countryService: CountryService, private orderService: OrderService, private router: Router) {}

  async ngOnInit() {
    let cart$ = await this.cartService.getCart();
    this.cartSubscription = cart$.subscribe((cart) => (this.cart = cart));
    this.userSubscription = this.authService.user$.subscribe((user) => (this.userId = user.uid));

    this.countryService.getAll().subscribe((data) => {
      for (let item of data) this.countries.push(item.name);
    });
  }

  async placeOrder() {
    let order = new Order(this.userId, this.billing, this.cart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
}
