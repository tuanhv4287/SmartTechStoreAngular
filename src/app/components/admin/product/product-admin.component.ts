import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product';
import { Category } from '../../../models/category';
import { environment } from '../../../environments/environment';
import { CategoryService } from '../../../services/category.service';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PaginationComponent } from '../../pagination/pagination.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-admin',
  standalone: true,
  imports: [FormsModule, TranslateModule, PaginationComponent],
  templateUrl: './product-admin.component.html',
  styleUrl: './product-admin.component.scss',
})
export class ProductAdminComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  selectedCategoryId: number = 0;
  listCategories: any = [];
  currentPage: number = 1;
  itemsPerPage: number = 12;
  pages: number[] = [];
  totalPages: number = 0;
  keyword: string = '';
  visiblePages: number[] = [];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getProducts(
      this.keyword,
      this.selectedCategoryId,
      this.currentPage,
      this.itemsPerPage
    );
    this.getCategories(1, 100);
  }

  getProducts(
    keyword: string,
    selectedCategoryId: number,
    page: number,
    limit: number
  ) {
    this.productService
      .getProducts(keyword, selectedCategoryId, page, limit)
      .subscribe({
        next: (response: any) => {
          response.products.forEach((product: Product) => {
            product.url = `${environment.apiBaseUrl}/products/images/${product.thumbnail}`;
          });
          this.products = response.products;
          this.totalPages = response.totalPages;
          this.visiblePages = this.generateVisiblePageArray(
            this.currentPage,
            this.totalPages
          );
        },
        complete: () => {},
        error: (error: any) => {
          console.error('Error fetching products:', error);
        },
      });
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
  addProduct() {
    const productForm = document.getElementById(
      'productForm'
    ) as HTMLDivElement;
    productForm.style.display = 'block';
  }
  closeForm() {
    const productForm = document.getElementById(
      'productForm'
    ) as HTMLDivElement;
    productForm.style.display = 'none';
  }
  getCategoryNameById(id: number) {
    let category = this.categories.find((x: any) => x.id == id);
    return category ? category.name : 'Chưa xác định';
  }
  onPageChange(page: number) {
    this.currentPage = page;
    this.getProducts(
      this.keyword,
      this.selectedCategoryId,
      this.currentPage,
      this.itemsPerPage
    );
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
  searchProducts(keyword: any) {
    this.getProducts(
      keyword,
      this.selectedCategoryId,
      this.currentPage,
      this.itemsPerPage
    );
  }

  editProduct(product: any) {
    this.router.navigate(['/admin/products', product.id], {
      state: { product },
    });
  }
  deleteProduct(Product: any) {}
}
