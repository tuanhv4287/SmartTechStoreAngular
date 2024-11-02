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
    user_id: 2,
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
  private orderService: OrderService
){
  this.orderForm = this.fb.group({
    fullname: ['hoàng xx', Validators.required], // fullname là FormControl bắt buộc      
    email: ['hoang234@gmail.com', [Validators.email]], // Sử dụng Validators.email cho kiểm tra định dạng email
    phone_number: ['11445547', [Validators.required, Validators.minLength(6)]], // phone_number bắt buộc và ít nhất 6 ký tự
    address: ['nhà x ngõ y', [Validators.required, Validators.minLength(5)]], // address bắt buộc và ít nhất 5 ký tự
    note: ['dễ vữ'],
    shipping_method: ['express'],
    payment_method: ['cod']
  });
}
  ngOnInit(): void {
    const cart = this.cartService.getCart();
    const productIds = Array.from(cart.keys());
    debugger
    this.productService.getProductsByIds(productIds).subscribe({
      next: (products)=>{
        debugger;
        this.cartItems = productIds.map((productId)=>{
          const product = products.find((p) => p.id === productId);
          if(product){
            product.thumbnail = `${environment.apiBaseUrl}/products/images/${product.thumbnail}`;
          }
          return {product: product!, quantity: cart.get(productId)!};
        });
        console.log("haha");
      },
      complete: ()=>{
        debugger;
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
    debugger
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
        debugger;
        console.log('Đặt hàng thành công');
      },
      complete: () => {
        this.calculateTotal();
      },
      error: (error: any) => {
        debugger;
        console.error('Lỗi khi đặt hàng:', error);
      },
    });
    } else {
      alert('Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.');
    }
  }
}
