import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { UserResponse } from '../../responses/user/user.response';
import { UserService } from '../../services/user.service';
import { TokenService } from '../../services/token.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { OrderAdminComponent } from "./order/order-admin.component";
import { CommonModule, isPlatformBrowser, NgSwitch, NgSwitchCase } from '@angular/common';
import { ProductAdminComponent } from "./product/product-admin.component";
import { CategoryAdminComponent } from "./category/category-admin.component";
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PlatformState } from '@angular/platform-server';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterLink, OrderAdminComponent, NgSwitch, NgSwitchCase, ProductAdminComponent, CategoryAdminComponent,CommonModule,RouterOutlet,TranslateModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit{
  adminComponent:String = 'orders'; 
  userResponse?: UserResponse
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private userService: UserService,
    private tokenService: TokenService,
    private router: Router,
    private translate: TranslateService,
    
  ){}
  ngOnInit() {
    // this.userResponse = this.userService.getUserResponseFromLocalStorage();    
    // Default router
    
    if (this.router.url === '/admin') {
      this.router.navigate(['/admin/orders']);
    } 
  }
  logout() {
    this.userService.removeUserFromLocalStorage();
    this.tokenService.removeToken();
    this.userResponse = this.userService.getUserResponseFromLocalStorage();
    this.router.navigate(['/login']);
  }
    showAdminComponent(componentName: string): void {
    if (componentName === 'orders') {
      this.router.navigate(['/admin/orders']);
    } else if (componentName === 'categories') {
      this.router.navigate(['/admin/categories']);
    } else if (componentName === 'products') {
      this.router.navigate(['/admin/products']);
    } else if (componentName === 'users') {
      this.router.navigate(['/admin/users']);
    } else if (componentName === 'dashboard') {
      this.router.navigate(['/admin/dashboard']);
    }
  }
  switchLanguage(language: string) {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined'){
      try {
        localStorage.setItem('language', language);
      } catch (error) {
        console.error('Error accessing localStorage:', error);
      }
    }else {
      console.error('localStorage is not available.');
    }
    this.translate.use(language);
    }
}
