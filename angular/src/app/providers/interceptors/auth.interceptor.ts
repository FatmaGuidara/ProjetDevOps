import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor
} from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem("g21Token")
    if(token){
      request = request.clone({ //add to the original token
        headers: request.headers.set("Authorization", token)
      }) 
    }
    return next.handle(request);
  }
}
