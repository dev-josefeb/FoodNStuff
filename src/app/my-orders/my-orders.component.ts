import { Component, Input, OnInit } from '@angular/core';
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
  @Input('is-Admin') isAdmin = false;
  userId: string;
  orders$: Observable<any>;
  userSubscription: Subscription;

  constructor(private orderService: OrderService, private authService: AuthService) {}

  async ngOnInit() {
    this.orders$ = this.authService.user$.pipe(
      switchMap((u) => {
        if (!this.isAdmin) return this.orderService.getOrdersByUser(u.uid);

        return this.orderService.getAll();
      })
    );
  }

  deleteOrder(order) {
    this.orderService.deleteOrder(order.key);
  }
}
