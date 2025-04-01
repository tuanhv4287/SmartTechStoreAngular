import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly TOKEN_KEY = 'access_token';
  private jwtHelperService = new JwtHelperService();

  constructor() {}

  getToken(): string | null {
    if (typeof window !== 'undefined' && typeof window.localStorage) {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }
  setToken(token: string): void {
    if (
      typeof window !== 'undefined' &&
      typeof window.localStorage !== 'undefined'
    ) {
      try {
        localStorage.setItem(this.TOKEN_KEY, token);
        console.log(localStorage, 'local');
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
      return '';
    }

    let userObject = this.jwtHelperService.decodeToken(token);
    if (!userObject) {
      console.log('Token không hợp lệ hoặc không thể giải mã');
      return '0';
    }
    return 'sub' in userObject ? userObject['sub'] : '';
  }
  removeToken(): void {
    if (
      typeof window !== 'undefined' &&
      typeof window.localStorage !== 'undefined'
    ) {
      try {
        localStorage.removeItem(this.TOKEN_KEY);
      } catch (error) {}
    } else {
      console.log('localStorage is not available in this environment.');
    }
  }
  isTokenExpired(): boolean {
    if (this.getToken() == null) {
      return false;
    }
    return this.jwtHelperService.isTokenExpired(this.getToken()!);
  }
}
