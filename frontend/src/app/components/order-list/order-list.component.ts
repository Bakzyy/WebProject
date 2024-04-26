import {Component, OnInit} from '@angular/core';
import {Order} from "../../models/order.model";
import {OrderService} from "../../services/order.service";
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule
  ],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent implements OnInit {
  orders!: Order[];

  constructor(private orderSerivce: OrderService, private router: Router) {
  }

  ngOnInit() {
    setInterval(() => {
      this.isValidToken();
      this.loadOrders()
    }, 5000);

  }

  isValidToken() {
    const access = localStorage.getItem("access")
    if (access) {
      console.log("Valid Token")
    } else {
      this.router.navigate(['/login'])
    }
  }

  loadOrders() {
    this.orderSerivce.getAllOrders().subscribe(orders => {
      this.orders = orders
    })
  }

  removeOrder(order: Order) {
    this.orderSerivce.deleteOrder(order.id).subscribe(any => {
      this.orders = this.orders.filter(o => o !== order)
      console.log("Success")
    })
  }

  saveOrder(order: Order) {
    this.orderSerivce.updateOrder(order.id, order).subscribe(any => {
      const index = this.orders.findIndex(o => o.id === order.id);
      if (index !== -1) {
        this.orders[index] = order;
      }
      console.log("Success Update!")

    })
  }
}
