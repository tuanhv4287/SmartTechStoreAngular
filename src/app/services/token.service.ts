import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
   private readonly TOKEN_KEY = 'access_token';


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
  removeToken():void{
    localStorage.removeItem(this.TOKEN_KEY);
  }

}
