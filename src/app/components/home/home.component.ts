import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { DetailProductComponent } from "../detail-product/detail-product.component";
import { environment } from '../../environments/environment';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Category } from '../../models/category';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, DetailProductComponent, NgFor, NgIf, NgClass],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
   products: Product[] = [];
  categories: Category[] = []; // Dữ liệu động từ categoryService
  selectedCategoryId: number  = 0; // Giá trị category được chọn
  currentPage: number = 1;
  itemsPerPage: number = 12;
  pages: number[] = [];
  totalPages:number = 0;
  visiblePages: number[] = [];
  keyword:string = "";

  
  constructor( private productService: ProductService){

  }

  ngOnInit(): void {
    this.getProducts(this.keyword, this.selectedCategoryId, this.currentPage, this.itemsPerPage);
  }
  getProducts(keyword: string, selectedCategoryId: number, page: number, limit: number) {
    this.productService.getProducts(keyword, selectedCategoryId, page, limit).subscribe({
      next: (response: any) => {
        response.products.forEach((product: Product) => {          
          product.url = `${environment.apiBaseUrl}/products/images/${product.thumbnail}`;
        });
        this.products = response.products;
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
  onPageChange(page: number) {
    this.currentPage = page;
    this.getProducts(this.keyword, this.selectedCategoryId, this.currentPage, this.itemsPerPage);
  }
  searchProducts() {
    this.currentPage = 1;
    this.itemsPerPage = 12;
    debugger
    this.getProducts(this.keyword, this.selectedCategoryId, this.currentPage, this.itemsPerPage);
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
}
