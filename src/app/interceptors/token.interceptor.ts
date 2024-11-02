import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {TokenService} from "../services/token.service"

export const TokenInterceptor:HttpInterceptorFn = (req, next)=> {
    debugger
    const tokenService = inject(TokenService); // Lấy instance của TokenService
    const token = tokenService.getToken(); // Lấy token
    if(token){
        req = req.clone({
            setHeaders: {
             Authorization: `Bearer ${token}`,
            },
        });
    }
    return next(req);
}
        