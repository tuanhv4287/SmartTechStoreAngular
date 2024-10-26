import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ProductService } from "./product.service";

@Injectable({
    providedIn: 'root'
  })
  export class CartService {
      private apiGetCategories = `http://localhost:8088/api/v1/cart`
      private cart: Map<number, number> = new Map();
  
    constructor(private http: HttpClient,
                private productService: ProductService
    ) { 
        const storedCart = localStorage.getItem('Cart');
        if(storedCart){
            this.cart = new Map(JSON.parse(storedCart));
        }
    }
    
    addToCart(productId: number, quantity: number = 1): void{
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
        localStorage.setItem('cart', JSON.stringify(Array.from(this.cart.entries())));
    }
    clearCart(): void{
        this.cart.clear();
        this.saveCartTolocalStorage();
    }
  }
  