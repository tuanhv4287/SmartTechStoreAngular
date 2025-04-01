import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/category';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { PaginationComponent } from '../../pagination/pagination.component';
@Component({
  selector: 'app-category-admin',
  standalone: true,
  imports: [
    NgIf,
    CommonModule,
    FormsModule,
    TranslateModule,
    PaginationComponent,
  ],
  templateUrl: './category-admin.component.html',
  styleUrl: './category-admin.component.scss',
})
export class CategoryAdminComponent implements OnInit {
  currentPage: number = 1;
  itemsPerPage: number = 12;
  pages: number[] = [];
  totalPages: number = 0;
  visiblePages: number[] = [];
  categories: Category[] = [];
  category: Category = { name: '', id: 0 };
  constructor(private categoryService: CategoryService) {}
  ngOnInit(): void {
    this.getCategories(1, 100);
  }
  getCategories(page: number, limit: number) {
    this.categoryService.getCategories(page, limit).subscribe({
      next: (categories: Category[]) => {
        this.categories = categories;
      },
      complete: () => {},
      error: (error: any) => {
        console.error('Error fetching categories', error);
      },
    });
  }
  addCategory() {
    const addCategoryForm = document.getElementById(
      'addCategoryForm'
    ) as HTMLDivElement; // Đảm bảo kiểu có thể là null
    addCategoryForm.style.display = 'block';
  }
  editCategory() {
    const editCategoryForm = document.getElementById(
      'editCategoryForm'
    ) as HTMLDivElement; // Đảm bảo kiểu có thể là null
    editCategoryForm.style.display = 'block';
  }
  closeForm() {
    const productForm = document.getElementById(
      'addCategoryForm'
    ) as HTMLDivElement; // Đảm bảo kiểu có thể là null
    productForm.style.display = 'none';
  }
  deleteCategory(id: number) {
    const confirmation = window.confirm(
      'Are you sure you want to delete this category? \nBạn có chắc chắn muốn xóa danh mục này?'
    );
    if (confirmation) {
      this.categoryService.deleteCategory(id).subscribe({
        next: (response: HttpResponse<any>) => {
          location.reload();
        },
        complete: () => {},
        error: (error: HttpErrorResponse) => {
          console.error(error?.error?.message ?? '');
        },
      });
    }
  }
  generateVisiblePageArray(currentPage: number, totalPages: number): number[] {
    const maxVisiblePages = 5;
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(currentPage - halfVisiblePages, 1);
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }

    return new Array(endPage - startPage + 1)
      .fill(0)
      .map((_, index) => startPage + index);
  }
  onPageChange(page: number) {
    this.currentPage = page;
    this.getCategories(this.currentPage, this.itemsPerPage);
  }
  submitForm() {
    console.log('Form Data:', this.category);
    this.categoryService.createCategory(this.category).subscribe({
      next: (response: HttpResponse<any>) => {
        location.reload();
      },
      complete: () => {
        location.reload();
      },
      error: (error: HttpErrorResponse) => {
        console.error(error?.error?.message ?? '');
      },
    });
    this.ngOnInit();
    this.closeForm();
  }
}
