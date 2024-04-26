import {Component, OnInit} from '@angular/core';
import {Product} from "../../models/product.model";
import {NgForOf, NgIf} from "@angular/common";
import {OrderService} from "../../services/order.service";
import {TopBarComponent} from "../top-bar/top-bar.component";
import {CartService} from "../../services/cart.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    TopBarComponent
  ],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent implements OnInit {
  products!: Product[];

  subTotal: number = 0
  grandTotal: number = 0;
  taxes: number = 5
  shipping: number = 15


  constructor(private cartService: CartService, private orderService: OrderService, private router: Router) {
  }

  ngOnInit() {
    setInterval(() => {
      this.isValidToken();
      console.log(this.subTotal)
    }, 2000);
      this.products = this.cartService.getProductsInCart()
      this.subTotal = Number(this.cartService.getTotalPrice());
      this.grandTotal = Number(this.cartService.getTotalPrice()) + this.shipping + this.taxes;
  }

  isValidToken() {
    const access = localStorage.getItem("access")
    if (access) {
      console.log("Valid Token")
    } else {
      this.router.navigate(['/login'])
    }
  }

  order() {
    for (let product of this.products) {
      this.orderService.createOrder(product, product.stock_quantity).subscribe(any => {
        console.log("Order Created")
        this.products = []
        this.cartService.clearAll()
      })
    }
  }

  remove(productToRemove: Product) {
    this.products = this.products.filter(product => product !== productToRemove)
  }
}
