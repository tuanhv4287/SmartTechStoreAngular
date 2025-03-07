import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { environment } from '../../environments/environment';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { Category } from '../../models/category';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as readline from 'readline';
@Component({
  selector: 'app-catalogsearch',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, NgFor, NgIf, NgClass, FormsModule],
  templateUrl: './catalogsearch.component.html',
  styleUrl: './catalogsearch.component.scss'
})
export class CatalogSearchComponent implements OnInit{
   products: Product[] = [];
  categories: Category[] = []; // Dữ liệu động từ categoryService
  selectedCategoryId: number  = 0; // Giá trị category được chọn
  currentPage: number = 0;
  itemsPerPage: number = 15;
  pages: number[] = [];
  totalPages:number = 0;
  visiblePages: number[] = [];
  keyword:string = "";
  productId: number = 0;
  currentImageIndex: number = 0;
  quantity: number = 1;
  data: string = '';
  constructor( private productService: ProductService,
                private categoryService: CategoryService,
                private router: Router,
                private route: ActivatedRoute
  ){

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log(params); // Kiểm tra params nhận được
      const idParam = params['selectedCategoryId'];
      if (idParam && !isNaN(idParam)) {
        this.selectedCategoryId = +idParam; // Ép kiểu sang số
        console.log(this.selectedCategoryId, 'this.selectedCategoryId');
      } else {
        console.log('Invalid ID:', idParam); // Nếu không phải số hợp lệ, hiển thị thông báo
      }
      
    });
    console.log(this.selectedCategoryId,'this.selectedCategoryId');
    
    
    this.getProducts(this.keyword, this.selectedCategoryId, 0, this.itemsPerPage);
    this.getCategories(1,100);
    this.route.queryParams.subscribe(params => {
      this.data = params['data'];
    });
  }
  slides: SlideInterface[] = [
    {
      url: 'https://data.webnhiepanh.com/wp-content/uploads/2020/11/21105453/phong-canh-1.jpg',
      title: '1',
    },
    {
      url: 'https://media.hanamtv.vn/upload/image/202112/medium/71038_cd71e10749fea767b93941678cfcee60.jpg',
      title: '2',
    },
    {
      url: 'https://phongnhaexplorer.com/wp-content/uploads/2021/08/du-lich-an-giang-b.jpg',
      title: '3',
    },
    {
      url: 'https://vapa.vn/wp-content/uploads/2022/12/anh-canh-dep-001-1.jpg',
      title: '4',
    },
    {
      url: 'https://kyluc.vn/userfiles/upload/images/modules/news/2016/7/11/0_hinh-anh-thien-nhien-dep-nhat-th-gioi.jpg',
      title: '5',
    },
  ];
  currentIndex: number = 0;
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
  getCategories(page: number, limit: number){
    this.categoryService.getCategories(page,limit).subscribe({
      next:(categories: Category[])=>{
        
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
    this.currentPage = 0;
    this.itemsPerPage = 15;
    
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

  scrollToTop(): void {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 10); // Độ trễ 10ms trước khi cuộn lên đầu
  }
  receiveData(data: any){
    this.keyword = data;
    this.searchProducts();
  }

}
export interface SlideInterface {
  url: string;
  title: string;
}
