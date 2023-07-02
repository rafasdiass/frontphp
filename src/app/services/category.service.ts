import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  createCategory(categoryData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/categories`, categoryData).pipe(
      tap((response: any) => console.log('Resposta do servidor:', response)),
      catchError(this.handleError)
    );
  }

  getCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/categories`).pipe(
      tap((response: any) => console.log('Resposta do servidor:', response)),
      catchError(this.handleError)
    );
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/categories/${id}`).pipe(
      tap((response: any) => console.log('Resposta do servidor:', response)),
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('Ocorreu um erro:', error);
    return throwError(error);
  }
}
