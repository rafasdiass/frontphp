import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Product } from '../models/product.model';
import { AuthResponse } from '../models/authresponse.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8000/api';
  private productsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient, private authService: AuthService) { }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, {email, password}).pipe(
      tap(response => {
        localStorage.setItem('authToken', response.access_token);
        this.authService.loadToken();
      })
    );
  }

  getProducts(categoryId?: number): Observable<Product[]> {
    const url = categoryId ? `${this.baseUrl}/products?category_id=${categoryId}` : `${this.baseUrl}/products`;
    return this.http.get<Product[]>(url);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/products/${id}`);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/products`, product);
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/products/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/products/${id}`);
  }

  updateProductsList(): void {
    this.getProducts().subscribe(products => {
      this.productsSubject.next(products);
    });
  }

  getProductsList(): BehaviorSubject<Product[]> {
    return this.productsSubject;
  }
}
