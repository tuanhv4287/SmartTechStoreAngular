import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
   private readonly TOKEN_KEY = 'access_token';
   private jwtHelperService = new JwtHelperService();


  constructor() { }

  getToken(): string | null {
    // Kiểm tra xem localStorage có sẵn không
    debugger
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null; // Trả về null nếu không có localStorage
  }
  setToken(token: string): void{
    localStorage.setItem(this.TOKEN_KEY, token);
    console.log(localStorage,'local');
  }
  getUserId(): number {
    let userObject = this.jwtHelperService.decodeToken(this.getToken() ?? '');
    return 'userId' in userObject ? parseInt(userObject['userId']) : 0;
  }
  removeToken():void{
    localStorage.removeItem(this.TOKEN_KEY);
  }
  isTokenExpired(): boolean{
    if(this.getToken() == null){
      return false;
    }
    return this.jwtHelperService.isTokenExpired(this.getToken()!);
  }

}
