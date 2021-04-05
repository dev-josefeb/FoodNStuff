import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../_models/order';
import { OrderService } from '../_services/order.service';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css'],
})
export class OrderSuccessComponent {
  id: string;
  order: Order;

  constructor(private orderService: OrderService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.orderService.getOrderById(this.id).subscribe((o: Order) => (this.order = o));
  }
}
