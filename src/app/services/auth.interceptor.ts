import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Obtenha o token JWT de onde quer que você o esteja armazenando
    const authToken = localStorage.getItem('authToken');

    // Clone a solicitação e substitua o cabeçalho de autorização original pela autorização JWT
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`)
    });

    // Envie a solicitação de autenticação ao invés da original
    return next.handle(authReq);
  }
}
