import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/orderService';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { OrderResponse } from '../../../responses/order/OrderResponse';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderDTO } from '../../../dtos/user/order/order.dto';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-detail-order-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './detail-order-admin.component.html',
  styleUrl: './detail-order-admin.component.scss'
})
export class DetailOrderAdminComponent implements OnInit{
  orderId:number = 0;
  orderResponse: OrderResponse = {
    id: 0, // Hoặc bất kỳ giá trị số nào bạn muốn
    user_id: 0,
    fullname: '',
    phone_number: '',
    email: '',
    address: '',
    note: '',
    order_date: new Date(),
    status: '',
    total_money: 0, 
    shipping_method: '',
    shipping_address: '',
    shipping_date: new Date(),
    payment_method: '',
    order_details: [],
    
  };  
  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.getOrderDetails();
  }
  
  getOrderDetails(): void {
    this.orderId = Number(this.route.snapshot.paramMap.get('id'));
    this.orderService.getOrderById(this.orderId).subscribe({
      next: (response: any) => {        
        this.orderResponse.id = response.id;
        this.orderResponse.user_id = response.user_id;
        this.orderResponse.fullname = response.fullname;
        this.orderResponse.email = response.email;
        this.orderResponse.phone_number = response.phone_number;
        this.orderResponse.address = response.address; 
        this.orderResponse.note = response.note;
        this.orderResponse.total_money = response.total_money;
        if (response.order_date) {
          this.orderResponse.order_date = new Date(
            response.order_date[0], 
            response.order_date[1] - 1, 
            response.order_date[2]
          );        
        }        
        this.orderResponse.order_details = response.order_details
          .map((order_detail:any) => {
          order_detail.product.thumbnail = `${environment.apiBaseUrl}/products/images/${order_detail.product.thumbnail}`;
          order_detail.number_of_products = order_detail.numberOfProducts
          //order_detail.total_money = order_detail.totalMoney
          return order_detail;
        });        
        this.orderResponse.payment_method = response.payment_method;
        if (response.shipping_date) {
          this.orderResponse.shipping_date = new Date(
            response.shipping_date[0],
            response.shipping_date[1] - 1,
            response.shipping_date[2]
          );
        }         
        this.orderResponse.shipping_method = response.shipping_method;        
        this.orderResponse.status = response.status;     
      },
      complete: () => {
      },
      error: (error: any) => {
        console.error('Error fetching detail:', error);
      }
    });
  }    
  
  saveOrder(): void {    
    this.orderService
      .updateOrder(this.orderId, new OrderDTO(this.orderResponse))
      .subscribe({
      next: (response: any) => {
        // Handle the successful update
        console.log('Order updated successfully:', response);
        // Navigate back to the previous page
        this.router.navigate(['../'], { relativeTo: this.route });
      },
      complete: () => {
      },
      error: (error: any) => {
        // Handle the error
        
        console.error('Error updating order:', error);
      }
    });   
  }
}
