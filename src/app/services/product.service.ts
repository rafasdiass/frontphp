import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Product } from '../models/product.model';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  createProduct(productData: Product): Observable<any> {
  return this.http.post<Product>(`${this.apiUrl}/products`, productData).pipe(
    tap(response => console.log('Resposta do servidor:', response)),
    catchError(this.handleError)
  );
}

private handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // Ocorreu um erro no cliente ou na rede.
    console.error('Um erro ocorreu:', error.error.message);
  } else {
    // O servidor retornou um código de resposta de falha.
    // O corpo da resposta pode conter pistas sobre o que deu errado.
    console.error(
      `O servidor retornou o código ${error.status}, ` +
      `corpo da resposta: `, error.error);
  }
  // Retornar um Observable com uma mensagem de erro voltada para o usuário.
  return throwError(
    'Algo ruim aconteceu; por favor, tente novamente mais tarde.');
};



  getProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/products`).pipe(
      catchError(this.handleError),
      tap((response: any) => {
        console.log('Resposta do servidor:', response);
      })
    );
  }

  deleteProduct(id: number | undefined): Observable<any> {
    return this.http.delete(`${this.apiUrl}/products/${id}`).pipe(
      catchError(this.handleError),
      tap((response: any) => {
        console.log('Resposta do servidor:', response);
      })
    );
  }

  // private handleError(error: any) {
  //   console.error('Ocorreu um erro:', error);
  //   return throwError(error);
  // }

}
