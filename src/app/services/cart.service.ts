import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ProductService } from "./product.service";
import { environment } from "../environments/environment";

@Injectable({
    providedIn: 'root'
  })
  export class CartService {
      private apiGetCart = `${environment.apiBaseUrl}/cart`
      private cart: Map<number, number> = new Map();
  
    constructor(private http: HttpClient,
                private productService: ProductService
    ) { 
        this.loadCartFromLocalStorage();
    }
    private loadCartFromLocalStorage(): void {
        if (typeof localStorage !== 'undefined') {
          const storedCart = localStorage.getItem('cart');
          if (storedCart) {
            try {
              // Chuyển đổi dữ liệu từ localStorage thành mảng cặp [key, value]
              const cartData: [number, number][] = JSON.parse(storedCart);
              this.cart = new Map(cartData);
            } catch (error) {
              console.error('Error parsing cart data from localStorage:', error);
            }
          }
        } else {
          console.error('localStorage is not available.');
        }
      }
    addToCart(productId: number, quantity: number = 1): void{
        debugger
        if(this.cart.has(productId)) {
            this.cart.set(productId, this.cart.get(productId)! + quantity);
        } else{
            this.cart.set(productId, quantity);
        }
        this.saveCartTolocalStorage();
    }
    getCart(): Map<number, number>{
        return this.cart;
    }
    private saveCartTolocalStorage(){
        debugger
        localStorage.setItem('cart', JSON.stringify(Array.from(this.cart.entries())));
    }
    clearCart(): void{
        this.cart.clear();
        this.saveCartTolocalStorage();
    }
  }
  