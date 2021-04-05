import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingCart } from '../_models/shopping-cart';
import { ShoppingCartService } from '../_services/shopping-cart.service';
import { CountryService } from '../_services/country.service';
import { OrderService } from '../_services/order.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { Order } from '../_models/order';
import { Router } from '@angular/router';
import firebase from 'firebase';
import { Billing } from '../_models/billing';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  billing: Billing = { firstName: '', lastName: '', email: '', address: '', address2: '', cardName: '', cardNumber: '', cardExpiry: '', cardCvv: '', sameShippingAddress: false, country: '', city: '', zip: '' };
  cart: ShoppingCart;
  countries: string[] = [];
  userId: string;
  cartSubscription: Subscription;
  userSubscription: Subscription;

  constructor(private authService: AuthService, private cartService: ShoppingCartService, private countryService: CountryService, private orderService: OrderService, private router: Router) {}

  async ngOnInit() {
    let cart$ = await this.cartService.getCart();
    this.cartSubscription = cart$.subscribe((cart) => (this.cart = cart));

    this.userSubscription = this.authService.user$.subscribe((user) => {
      this.userId = user.uid;
      this.setUserDetails(user);
    });

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

  private setUserDetails(user: firebase.User) {
    this.billing.email = user.email;

    if (!user.displayName) return;
    this.billing.firstName = user.displayName.split(' ')[0];
    this.billing.lastName = user.displayName.split(' ')[1];
  }
}
