import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Order} from "../models/order.model";
import {Product} from "../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class OrderService {private apiUrl = "http://localhost:8000/api/orders/";

  constructor(private http: HttpClient) {}

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  getOrderById(orderId: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}${orderId}/`);
  }

  deleteOrder(orderId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${orderId}/`);
  }

  createOrder(product: Product, quantity: number): Observable<Order> {
    let orderData = {
      "product": product.id,
      "quantity": quantity,
      "unit_price": product.price
    }
    return this.http.post<Order>(this.apiUrl, orderData);
  }

  updateOrder(orderId: number, updatedOrder: Partial<Order>): Observable<Order> {
    const url = `${this.apiUrl}/orders/${orderId}`;
    return this.http.patch<Order>(url, updatedOrder);
  }

}
