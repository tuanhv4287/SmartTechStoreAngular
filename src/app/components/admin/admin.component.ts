import { Component, OnInit } from '@angular/core';
import { UserResponse } from '../../responses/user/user.response';
import { UserService } from '../../services/user.service';
import { TokenService } from '../../services/token.service';
import { Router, RouterLink } from '@angular/router';
import { OrderAdminComponent } from "./order/order-admin.component";
import { NgSwitch, NgSwitchCase } from '@angular/common';
import { ProductAdminComponent } from "./product/product-admin.component";
import { CategoryAdminComponent } from "./category/category-admin.component";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterLink, OrderAdminComponent, NgSwitch, NgSwitchCase, ProductAdminComponent, CategoryAdminComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit{
  adminComponent:String = 'orders'; 
  userRespose?: UserResponse
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private router: Router
  ){}
  ngOnInit() {
    this.userRespose = this.userService.getUserResponseFromLocalStorage();
  }
  logout() {
    this.userService.removeUserFromLocalStorage();
    this.tokenService.removeToken();
    this.userRespose = this.userService.getUserResponseFromLocalStorage();
  }
    // showAdminComponent(componentName: string): void {
    // debugger
    // if (componentName === 'orders') {
    //   this.router.navigate(['/admin/orders']);
    // } else if (componentName === 'categories') {
    //   this.router.navigate(['/admin/categories']);
    // } else if (componentName === 'products') {
    //   this.router.navigate(['/admin/products']);
    // } else if (componentName === 'users') {
    //   this.router.navigate(['/admin/users']);
    // }
  // }
  showAdminComponent(componentName: string): void {
    this.adminComponent = componentName;
  }
}
