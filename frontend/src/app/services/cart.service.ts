import { Injectable } from '@angular/core';
import {Product} from "../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private productsInCart: Product[] = [];

  constructor() {}

  addToCart(product: Product) {
    this.productsInCart.push(product);
  }

  getProductsInCart(): Product[] {
    return this.productsInCart;
  }

  getTotalPrice(): number {
    return this.productsInCart.reduce((total, product) => total + product.price*product.stock_quantity, 0);
  }

  clearAll(){
    this.productsInCart = []
  }
}
