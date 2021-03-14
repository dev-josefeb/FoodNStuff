import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../shopping-cart.service';
import { CountryService } from '../country.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  cart$: Observable<ShoppingCart>;
  countries: string[] = [];

  constructor(private cartService: ShoppingCartService, private countryService: CountryService) {}

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
    this.countryService.getAll().subscribe((data) => {
      for (let item of data) this.countries.push(item.name);
    });
  }
}
