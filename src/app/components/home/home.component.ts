import { Component, HostListener, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { environment } from '../../environments/environment';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { NgFor, NgIf, NgStyle } from '@angular/common';
import { Category } from '../../models/category';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    NgFor,
    NgIf,
    FormsModule,
    NgStyle,
    TranslateModule,
    PaginationComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  selectedCategoryId: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 15;
  pages: number[] = [];
  totalPages: number = 0;
  visiblePages: number[] = [];
  keyword: string = '';
  showButton: boolean = false;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showButton = window.scrollY > 100;
  }
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
  slides: SlideInterface[] = [
    {
      url: '../../assets/banner/banner-ip16-02.png',
      title: '1',
    },
    {
      url: '../../assets/banner/banner-ip16-01.png',
      title: '2',
    },
    {
      url: '../../assets/banner/banner-ip16-03.png',
      title: '3',
    },
    {
      url: '../../assets/banner/banner-ip16-04.png',
      title: '4',
    },
    {
      url: '../../assets/banner/banner-ip16-05.png',
      title: '5',
    },
    {
      url: '../../assets/banner/banner-ip16-06.png',
      title: '6',
    },
  ];
  currentIndex: number = 0;
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
  onPageChange(page: number) {
    this.currentPage = page;
    this.getProducts(
      this.keyword,
      this.selectedCategoryId,
      this.currentPage,
      this.itemsPerPage
    );
  }
  searchProducts() {
    this.currentPage = 1;
    this.itemsPerPage = 12;

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
  onProductClick(productId: number) {
    this.router.navigate(['/products', productId]);
  }
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  getCurrentSlideUrl(): string {
    return `url('${this.slides[this.currentIndex].url}')`;
  }
  goToNext() {
    const isLastSlide = this.currentIndex === this.slides.length - 1;
    const newIndex = isLastSlide ? 0 : this.currentIndex + 1;
    this.currentIndex = newIndex;
  }
  goToPrevious() {
    const isFirstSlide = this.currentIndex === 0;
    const newIndex = isFirstSlide
      ? this.slides.length - 1
      : this.currentIndex - 1;
    this.currentIndex = newIndex;
  }
  goToSlide(slideIndex: number) {
    this.currentIndex = slideIndex;
  }
  receiveData(data: string) {
    this.keyword = data;
    this.searchProducts();
  }
}

export interface SlideInterface {
  url: string;
  title: string;
}
