import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { environment } from '../../environments/environment';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderDTO } from '../../dtos/user/order/order.dto';
import { response } from 'express';
import { error } from 'console';
import { OrderService } from '../../services/orderService';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [HeaderComponent, FooterComponent,CommonModule,FormsModule,ReactiveFormsModule ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit{
  orderForm: FormGroup ;
  cartItems: { product: Product, quantity: number}[] = [];
  totalAmount: number = 0;
  couponCode='';
  orderData: OrderDTO = {
    user_id: '2',
    fullname: '',
    email: '',
    phone_number: '',
    address: '',
    note: '',
    total_money: 0,
    payment_method: 'cod',
    shipping_method: 'express',
    coupon_code: '',
    cart_items:[]
  };
constructor(
  private cartService: CartService,
  private productService: ProductService,
  private fb: FormBuilder,
  private orderService: OrderService,
  private tokenService: TokenService,
  private router: Router
){
  this.orderForm = this.fb.group({
    fullname: ['', Validators.required], // fullname là FormControl bắt buộc      
    email: ['', [Validators.email]], // Sử dụng Validators.email cho kiểm tra định dạng email
    phone_number: ['', [Validators.required, Validators.minLength(6)]], // phone_number bắt buộc và ít nhất 6 ký tự
    address: ['', [Validators.required, Validators.minLength(5)]], // address bắt buộc và ít nhất 5 ký tự
    note: [''],
    shipping_method: [''],
    payment_method: ['']
  });
}
  ngOnInit(): void {
    // this.cartService.clearCart();
    const userIdStr = this.tokenService.getUserId();
    this.orderData.user_id = userIdStr;
    const cart = this.cartService.getCart();
    const productIds = Array.from(cart.keys());
    
    if(productIds.length  === 0){
      return ;
    }
    this.productService.getProductsByIds(productIds).subscribe({
      next: (products)=>{
        ;
        this.cartItems = productIds.map((productId)=>{
          const product = products.find((p) => p.id === productId);
          if(product){
            product.thumbnail = `${environment.apiBaseUrl}/products/images/${product.thumbnail}`;
          }
          return {product: product!, quantity: cart.get(productId)!};
        });
      },
      complete: ()=>{
        ;
        this.calculateTotal();

      },
      error: (error:any)=>{
        console.error('Error fetching detail:', error);
      }
    })
  }
  calculateTotal():void {
    this.totalAmount = this.cartItems.reduce(
      (total, item)=> total + item.product.price * item.quantity, 0
    );
  }
  placeOrder(){
    
    if(this.orderForm.valid){
      this.orderData = {
        ...this.orderData,
        ...this.orderForm.value
      };
    this.orderData.cart_items = this.cartItems.map(cartItem =>({
      product_id: cartItem.product.id,
      quantity: cartItem.quantity
    }));
    this.orderService.placeOrder(this.orderData).subscribe({
      next: (response)=> {
        ;
        console.log('Đặt hàng thành công');
        this.cartService.clearCart();
        this.router.navigate(['/orders/', response.id])
      },
      complete: () => {
        this.calculateTotal();
      },
      error: (error: any) => {
        ;
        console.error('Lỗi khi đặt hàng:', error);
      },
    });
    } else {
      alert('Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.');
    }
  }
}
