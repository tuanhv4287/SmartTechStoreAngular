import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { UserResponse } from '../../../responses/user/user.response';
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { log } from 'node:console';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { PaginationComponent } from "../../pagination/pagination.component";

@Component({
  selector: 'app-user-admin',
  standalone: true,
  imports: [NgClass, NgIf, NgFor, CommonModule, FormsModule, TranslateModule, PaginationComponent],
  templateUrl: './user-admin.component.html',
  styleUrl: './user-admin.component.scss'
})
export class UserAdminComponent {

users: UserResponse[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 12;
  pages: number[] = [];
  totalPages: number = 0;
  keyword: string = "";
  visiblePages: number[] = [];
  isDialogOpen: boolean = false; // Trạng thái mở/đóng modal
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  constructor(
    private userService: UserService,
    private router: Router
  ){}
  ngOnInit(): void {
    this.getAllUser(this.keyword, this.currentPage, this.itemsPerPage);
  }
  getAllUser(keyword: string, page: number, limit: number) {
    this.userService.getAllUsers(keyword, page, limit).subscribe({
      next: (response: any) => {
        
        this.users = response.users;
        this.totalPages = response.totalPages;
        this.visiblePages = this.generateVisiblePageArray(this.currentPage, this.totalPages);
      },
      complete: () =>{
        
      },
      error: (error: any) =>{
        
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
    this.getAllUser(this.keyword, this.currentPage, this.itemsPerPage);
  }
  deleteUser(id:number) {
    const confirmation = window
      .confirm('Are you sure you want to delete this user? \nBạn có chắc chắn muốn xóa người dùng này?');
    if (confirmation) {
      
      this.userService.deleteUser(id).subscribe({
        next: (response: HttpResponse<any>) => {
          ;
          location.reload();
        },
        complete: () => {
          ;
        },
        error: (error: HttpErrorResponse) => {
          ;
          console.error(error?.error?.message ?? '');
        }
      });    
    }
  }
  editUser(user: UserResponse){
    this.router.navigate(['/admin/users', user.id],{state: { user }});
  }
  searchUsers(keyword: any){
    this.getAllUser(this.keyword.trim(), this.currentPage, this.itemsPerPage);
  }
  
}
