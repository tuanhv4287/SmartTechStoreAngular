import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiGetCart = `${environment.apiBaseUrl}/cart`;
  private cart: Map<number, number> = new Map();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.loadCartFromLocalStorage();
  }
  private loadCartFromLocalStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        const cartData: [number, number][] = JSON.parse(storedCart);
        this.cart = new Map(cartData);
      }
    } else {
      console.error('localStorage is not available.');
    }
  }
  addToCart(productId: number, quantity: number = 1): void {
    if (this.cart.has(productId)) {
      this.cart.set(productId, this.cart.get(productId)! + quantity);
    } else {
      this.cart.set(productId, quantity);
    }
    this.saveCartTolocalStorage();
  }
  getCart(): Map<number, number> {
    return this.cart;
  }
  private saveCartTolocalStorage() {
    if (
      typeof window !== 'undefined' &&
      typeof window.localStorage !== 'undefined'
    ) {
      try {
        localStorage.setItem(
          'cart',
          JSON.stringify(Array.from(this.cart.entries()))
        );
      } catch (error) {
        console.error('Error accessing localStorage:', error);
      }
    } else {
      console.log('localStorage is not available in this environment.');
    }
  }
  clearCart(): void {
    this.cart.clear();
    this.saveCartTolocalStorage();
  }
}
