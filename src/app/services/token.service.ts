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
    
    if (typeof window !== 'undefined' && typeof window.localStorage) {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null; // Trả về null nếu không có localStorage
  }
  setToken(token: string): void{
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      try {
        localStorage.setItem(this.TOKEN_KEY, token);
        console.log(localStorage, 'local'); // Log để kiểm tra
      } catch (error) {
        console.error('Error accessing localStorage:', error);
      }
    } else {
      console.log('localStorage is not available in this environment.');
    }
  }
  getUserId(): string {
    const token = this.getToken();
    if (!token) {
        return '';  // Nếu không có token, trả về 0
    }

    let userObject = this.jwtHelperService.decodeToken(token);
    if (!userObject) {
        console.log('Token không hợp lệ hoặc không thể giải mã');
        return '0';  // Nếu không thể giải mã token, trả về 0
    }

    // Kiểm tra xem userId có trong userObject hay không
    return 'sub' in userObject ? userObject['sub'] : '';
  }
  removeToken():void{
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      try {
        localStorage.removeItem(this.TOKEN_KEY);
      } catch (error) {
      }
    } else {
      console.log('localStorage is not available in this environment.');
    }
    
  }
  isTokenExpired(): boolean{
    if(this.getToken() == null){
      return false;
    }
    return this.jwtHelperService.isTokenExpired(this.getToken()!);
  }

}
