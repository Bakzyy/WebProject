import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Product} from "../models/product.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = "http://localhost:8000/api/products/";

  constructor(private http: HttpClient) {
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getBestSellerProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:8000/api/best-seller')
  }

  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}${productId}/`);
  }

  deleteProduct(productId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${productId}/`);
  }

  updateProduct(productId: number, productData: any): Observable<Product> {
    return this.http.patch<Product>(`${this.apiUrl}${productId}/`, productData);
  }

  createProduct(productData: any): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, productData);
  }
}
