import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/orderService';
import { OrderResponse } from '../../../responses/order/OrderResponse';
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-admin',
  standalone: true,
  imports: [NgClass,NgIf,NgFor,CommonModule,FormsModule],
  templateUrl: './order-admin.component.html',
  styleUrl: './order-admin.component.scss'
})
export class OrderAdminComponent implements OnInit{
  orders: OrderResponse[] = [];
  currentPage: number = 0;
  itemsPerPage: number = 12;
  pages: number[] = [];
  totalPages: number = 0;
  keyword: string = "";
  visiblePages: number[] = [];
  constructor(
    private orderService: OrderService,
    private router: Router
  ){}
  ngOnInit(): void {
    this.getAllOrder(this.keyword, this.currentPage, this.itemsPerPage);
  }
  getAllOrder(keyword: string, page: number, limit: number) {
    this.orderService.getAllOrders(keyword, page, limit).subscribe({
      next: (response: any) => {
        debugger
        this.orders = response.orders;
        this.totalPages = response.totalPages;
        this.visiblePages = this.generateVisiblePageArray(this.currentPage, this.totalPages);
      },
      complete: () =>{
        debugger
      },
      error: (error: any) =>{
        debugger
        console.error('Error fetching products:', error);
      }
    })
  }
  generateVisiblePageArray(currentPage: number, totalPages: number): number[] {
    const maxVisiblePages = 5;
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(currentPage - halfVisiblePages, 1);
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }

    return new Array(endPage - startPage + 1).fill(0).map((_, index) => startPage + index);
  }
  onPageChange(page: number) {
    this.currentPage = page;
    this.getAllOrder(this.keyword, this.currentPage, this.itemsPerPage);
  }
  deleteOrder(id:number) {
    const confirmation = window
      .confirm('Are you sure you want to delete this order?');
    if (confirmation) {
      debugger
      // this.orderService.deleteOrder(id).subscribe({
      //   next: (response: ApiResponse) => {
      //     debugger 
      //     location.reload();          
      //   },
      //   complete: () => {
      //     debugger;          
      //   },
      //   error: (error: HttpErrorResponse) => {
      //     debugger;
      //     console.error(error?.error?.message ?? '');
      //   }
      // });    
    }
  }
  viewDetails(order:OrderResponse) {
    debugger
    this.router.navigate(['/admin/orders', order.id]);
  }
  searchOrders(){
    
  }
}
