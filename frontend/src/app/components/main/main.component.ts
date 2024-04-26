import {Component, OnInit} from '@angular/core';
import {Category} from "../../models/category.model";
import {NgForOf, NgIf} from "@angular/common";
import {Product} from "../../models/product.model";
import {ProductService} from "../../services/product.service";
import {CategoryService} from "../../services/category.service";
import {TopBarComponent} from "../top-bar/top-bar.component";
import {Router, RouterLink} from "@angular/router";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    NgForOf,
    TopBarComponent,
    RouterLink,
    NgIf
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit{
  products!: Product[];
  selectedCategory: number = -1;
  categories!: Category[];

  constructor(private productService: ProductService, private cartService: CartService, private categoryService: CategoryService, private router: Router) {
  }

  ngOnInit(): void {
    setInterval(() => {
      this.isValidToken();
    }, 5000);

      this.loadProducts()
      this.loadCategories()
  }


  isValidToken() {
    const access = localStorage.getItem("access")
    if (access) {
      console.log("Valid Token")
    } else {
      this.router.navigate(['/login'])
    }
  }


  loadProducts() {
    this.productService.getAllProducts().subscribe(products => {
      this.products = products
    })
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe(categories => {
      this.categories = categories
    })
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product)
  }

  share(link: string) {
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(link)}`;
    window.open(telegramUrl, '_blank');
  }

  selectCategory(id: number) {
    this.selectedCategory = id
  }
}
