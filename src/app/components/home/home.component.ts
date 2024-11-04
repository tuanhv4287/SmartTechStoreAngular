import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { DetailProductComponent } from "../detail-product/detail-product.component";
import { environment } from '../../environments/environment';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Category } from '../../models/category';
import { FormsModule } from '@angular/forms';
import { error } from 'node:console';
import { CategoryService } from '../../services/category.service';
import { Route, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, DetailProductComponent, NgFor, NgIf, NgClass, FormsModule, RouterLink],
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

  
  constructor( private productService: ProductService,
                private categoryService: CategoryService,
                private router: Router
  ){

  }

  ngOnInit(): void {
    this.getProducts(this.keyword, this.selectedCategoryId, this.currentPage, this.itemsPerPage);
    this.getCategories(1,100);
  }
  getProducts(keyword: string, selectedCategoryId: number, page: number, limit: number) {
    this.productService.getProducts(keyword, selectedCategoryId, page, limit).subscribe({
      next: (response: any) => {
        debugger
        response.products.forEach((product: Product) => {          
          product.url = `${environment.apiBaseUrl}/products/images/${product.thumbnail}`;
        });
        this.products = response.products;
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
  getCategories(page: number, limit: number){
    this.categoryService.getCategories(page,limit).subscribe({
      next:(categories: Category[])=>{
        debugger
        this.categories = categories;
      },
      complete: ()=>{

      },
      error: (error: any)=>{
        console.error('Error fetching categories',error)
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
  onProductClick(productId: number) {
    this.router.navigate(['/products', productId]);
  }  
}
