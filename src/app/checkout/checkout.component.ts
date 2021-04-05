import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingCart } from '../_models/shopping-cart';
import { ShoppingCartService } from '../_services/shopping-cart.service';
import { CountryService } from '../_services/country.service';
import { OrderService } from '../_services/order.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { Order } from '../_models/order';
import { Router } from '@angular/router';
import { Billing } from '../_models/billing';
import { UserService } from '../_services/user.service';
import firebase from 'firebase';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  billing: Billing = { firstName: '', lastName: '', email: '', address: '', address2: '', cardName: '', cardNumber: '', cardExpiry: new Date(), cardCvv: '', sameShippingAddress: false, country: '', city: '', zip: '' };
  cart: ShoppingCart;
  countries: string[] = [];
  userId: string;
  cartSubscription: Subscription;
  authUserSubscription: Subscription;
  userSubscription: Subscription;

  constructor(private authService: AuthService, private cartService: ShoppingCartService, private countryService: CountryService, private orderService: OrderService, private router: Router, private userService: UserService) {}

  async ngOnInit() {
    let cart$ = await this.cartService.getCart();
    this.cartSubscription = cart$.subscribe((cart) => (this.cart = cart));

    this.authUserSubscription = this.authService.user$.subscribe((user) => {
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
    this.authUserSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  private setUserDetails(user: firebase.User) {
    this.userSubscription = this.userService.get(user.uid).subscribe((user) => {
      this.billing.email = user.email;
      this.billing.firstName = user.name.split(' ')[0];
      this.billing.lastName = user.name.split(' ')[1];
      this.billing.cardName = user.name;
    });
  }
}
