import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { notificationAnimation } from './navbar.component.animation';
import { AuthService } from '../_services/auth.service';
import { AppUser } from '../_models/app-user';
import { ShoppingCart } from '../_models/shopping-cart';
import { ShoppingCartService } from '../_services/shopping-cart.service';
import firebase from 'firebase';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [notificationAnimation],
})
export class NavbarComponent implements OnInit {
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;
  state = 'intital';
  authGoogle = new firebase.auth.GoogleAuthProvider();

  constructor(private auth: AuthService, private cartService: ShoppingCartService) {}

  logout() {
    this.auth.logout();
  }

  async ngOnInit() {
    this.auth.appUser$.subscribe((appUser) => (this.appUser = appUser));
    this.cart$ = await this.cartService.getCart();
    this.cartService.cartItemCountChange.subscribe(() => this.onCartItemCountChange());
  }

  onCartItemCountChange() {
    this.state = 'final';
  }

  resetState() {
    this.state = 'initial';
  }

  login() {
    this.auth.login(this.authGoogle);
  }
}
