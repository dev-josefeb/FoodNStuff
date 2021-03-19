import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../shopping-cart.service';
import { CountryService } from '../country.service';
import { OrderService } from '../order.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  billing = {};
  cart: ShoppingCart;
  countries: string[] = [];
  subscription: Subscription;

  constructor(private cartService: ShoppingCartService, private countryService: CountryService, private orderService: OrderService) {}

  async ngOnInit() {
    let cart$ = await this.cartService.getCart();
    this.subscription = cart$.subscribe((cart) => (this.cart = cart));
    this.countryService.getAll().subscribe((data) => {
      for (let item of data) this.countries.push(item.name);
    });
  }

  placeOrder() {
    console.log(this.billing);

    let order = {
      datePlaced: new Date().getTime(),
      billing: this.billing,
      items: this.cart.items.map((i) => {
        return {
          product: {
            title: i.title,
            imageUrl: i.imageUrl,
            price: i.price,
          },
          quantity: i.quantity,
          totalPrice: i.totalPrice,
        };
      }),
    };

    this.orderService.storeOrder(order);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
