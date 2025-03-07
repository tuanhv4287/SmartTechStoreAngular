import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { emitKeypressEvents } from 'readline';
import * as readline from 'readline';
@Component({
  selector: 'app-category-admin',
  standalone: true,
  imports: [NgIf,NgFor,NgStyle,NgClass],
  templateUrl: './category-admin.component.html',
  styleUrl: './category-admin.component.scss'
})
export class CategoryAdminComponent implements OnInit{
  constructor(     private router: Router){

  }
  ngOnInit(): void {
    
  }
  showPhoneBrands = false;
  showlaptopBrands = false;
  
  ProductCategories = [
  {
    icon: 'fa-solid fa-mobile-screen',
    name:'Điện thoại',
    id:3,
    listCategories: ['Iphone', 'Vivo', 'Redme'],
    phonePrice: ['Dưới 2 triệu', 'Từ 2 - 4 triệu', 'Từ 4 - 7 triệu', 'Từ 7 - 13 triệu', 'Từ 13 - 20 triệu', 'Trên 20 triệu']
  },
  {
    icon: 'fa-solid fa-laptop',
    id:4,
    name:'LapTop',
    listCategories: ['Dell', 'Asus', 'Aser'],
    phonePrice: ['Dưới 2 triệu', 'Từ 2 - 4 triệu', 'Từ 4 - 7 triệu', 'Từ 7 - 13 triệu', 'Từ 13 - 20 triệu', 'Trên 20 triệu']
  },  {
    icon: 'fa-solid fa-laptop',
    id:5,
    name:'Đồng hồ',
    listCategories: ['Iphone', 'Vivo', 'Redme'],
    phonePrice: ['Dưới 2 triệu', 'Từ 2 - 4 triệu', 'Từ 4 - 7 triệu', 'Từ 7 - 13 triệu', 'Từ 13 - 20 triệu', 'Trên 20 triệu']
  },
  {
    icon: 'fa-solid fa-laptop',
    id:6,
    name:'Máy lạnh',
    listCategories: ['Iphone', 'Vivo', 'Redme'],
    phonePrice: ['Dưới 2 triệu', 'Từ 2 - 4 triệu', 'Từ 4 - 7 triệu', 'Từ 7 - 13 triệu', 'Từ 13 - 20 triệu', 'Trên 20 triệu']
  },
  {
    icon: 'fa-solid fa-laptop',
    id:9,
    name:'Tủ lạnh',
    listCategories: ['Iphone', 'Vivo', 'Redme'],
    phonePrice: ['Dưới 2 triệu', 'Từ 2 - 4 triệu', 'Từ 4 - 7 triệu', 'Từ 7 - 13 triệu', 'Từ 13 - 20 triệu', 'Trên 20 triệu']
  },
  {
    icon: 'fa-solid fa-laptop',
    id:10,
    name:'Máy giặt',
    listCategories: ['Iphone', 'Vivo', 'Redme'],
    phonePrice: ['Dưới 2 triệu', 'Từ 2 - 4 triệu', 'Từ 4 - 7 triệu', 'Từ 7 - 13 triệu', 'Từ 13 - 20 triệu', 'Trên 20 triệu']
  },
  {
    icon: 'fa-solid fa-laptop',
    id:11,
    name:'Phụ kiện',
    listCategories: ['Iphone', 'Vivo', 'Redme'],
    phonePrice: ['Dưới 2 triệu', 'Từ 2 - 4 triệu', 'Từ 4 - 7 triệu', 'Từ 7 - 13 triệu', 'Từ 13 - 20 triệu', 'Trên 20 triệu']
  },
  {
    icon: 'fa-solid fa-laptop',
    id:12,
    name:'Tivi',
    listCategories: ['Iphone', 'Vivo', 'Redme'],
    phonePrice: ['Dưới 2 triệu', 'Từ 2 - 4 triệu', 'Từ 4 - 7 triệu', 'Từ 7 - 13 triệu', 'Từ 13 - 20 triệu', 'Trên 20 triệu']
  },
  {
    icon: 'fa-solid fa-laptop',
    id:13,
    name:'Thông tin',
    listCategories: ['Iphone', 'Vivo', 'Redme'],
    phonePrice: ['Dưới 2 triệu', 'Từ 2 - 4 triệu', 'Từ 4 - 7 triệu', 'Từ 7 - 13 triệu', 'Từ 13 - 20 triệu', 'Trên 20 triệu']
  },
  {
    icon: 'fa-solid fa-laptop',
    id:14,
    name:'Dịch vụ tiện ích',
    listCategories: ['Iphone', 'Vivo', 'Redme'],
    phonePrice: ['Dưới 2 triệu', 'Từ 2 - 4 triệu', 'Từ 4 - 7 triệu', 'Từ 7 - 13 triệu', 'Từ 13 - 20 triệu', 'Trên 20 triệu']
  },];
  searchProducts(ProductCategory:any){
    console.log(ProductCategory.name);
    this.router.navigate(['/catalogsearch'], { queryParams: { selectedCategoryId: ProductCategory.id } });

  }
  searchPrice(phonePrice?:any){
    console.log(phonePrice,'phonePrice');
    // this.router.navigate(['/catalogsearch'], { queryParams: { selectedCategoryId: ProductCategory.id } });

  }
  // Hàm hiển thị các hãng điện thoại
  showBrands(category: string): void {
    // if (category === 'phone') {
    //   this.showPhoneBrands = true;
    // }
    // else if(category === 'laptop'){
    //   this.showlaptopBrands = true;
    // }
    this.showPhoneBrands = true;
  }

  // Hàm ẩn danh sách hãng điện thoại
  hideBrands(): void {
    this.showPhoneBrands = false;
  }
}
