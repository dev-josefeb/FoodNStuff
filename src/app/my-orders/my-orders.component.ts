import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { OrderService } from '../_services/order.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent implements OnInit {
  userId: string;
  orders$: Observable<any>;
  userSubscription: Subscription;

  constructor(private orderService: OrderService, private authService: AuthService) {}

  async ngOnInit() {
    this.orders$ = this.authService.user$.pipe(switchMap((u) => this.orderService.getOrdersByUser(u.uid)));
  }
}
