import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { UserResponse } from '../../responses/user/user.response';
import { UserService } from '../../services/user.service';
import { TokenService } from '../../services/token.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { OrderAdminComponent } from "./order/order-admin.component";
import { CommonModule, isPlatformBrowser, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { ProductAdminComponent } from "./product/product-admin.component";
import { CategoryAdminComponent } from "./category/category-admin.component";
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PlatformState } from '@angular/platform-server';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterLink,NgbModule,CommonModule,RouterOutlet,TranslateModule,NgIf, CommonModule, FormsModule, TranslateModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit{
  isPopoverOpen = false;
  adminComponent: string = 'orders'; 
  userResponse?: UserResponse
  password: string = '';
  togglePopover(event: Event): void{
    event.preventDefault();
    this.isPopoverOpen = !this.isPopoverOpen;
  }
  handleItemClick(index: number): void{
    
    if(index === 0){
      const userId = this.userResponse?.id
      this.router.navigate(['/admin/users/'+ userId]);
    }
    else if(index === 2){
      this.logout()
    }
    this.isPopoverOpen = false;
    
  }
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private userService: UserService,
    private tokenService: TokenService,
    private router: Router,
    private translate: TranslateService,
    
  ){}
  ngOnInit() {
    this.userResponse = this.userService.getUserResponseFromLocalStorage();
    
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
    save(): void{
        // if(this.userProfileForm.valid){
        //   const updateUserDTO: UpdateUserDTO = {
        //     fullname: this.userProfileForm.get('fullname')?.value,
        //     address: this.userProfileForm.get('address')?.value,
        //     phone_number: this.userProfileForm.get('phone_number')?.value,
        //     password: this.userProfileForm.get('password')?.value,
        //     retype_password: this.userProfileForm.get('retype_password')?.value,
        //     date_of_birth: this.userProfileForm.get('date_of_birth')?.value,
        //   }
        //   this.userService.updateUserDetail(this.token, updateUserDTO ).subscribe({
        //     next: (response:any)=>{
              
        //       this.userService.removeUserFromLocalStorage();
        //       this.tokenService.removeToken();
        //       this.router.navigate(['/login'])
        //     },
        //     error:(error:any)=>{
        //       alert(error.error.message)
        //     }
        //   });
        // }
        // else{
        //     if(this.userProfileForm.hasError('passwordMismatch')){
        //       alert("Mật khẩu và mật khẩu gõ lại chưa chính xác")
        //     }
        // }
      }
      submitForm(){
                // console.log('Form Data:', this.category);
                // this.categoryService.createCategory(this.category).subscribe({
                //   next: (response: HttpResponse<any>) => {
                //     ;
                //     location.reload();
                    
                //   },
                //   complete: () => {
                //     location.reload();
                //     ;
                //   },
                //   error: (error: HttpErrorResponse) => {
                //     ;
                //     console.error(error?.error?.message ?? '');
                //   }
                // }); 
                // this.ngOnInit()
        this.closeForm();
              }
              closeForm(){
                const ChangePWForm = document.getElementById("changePWForm") as HTMLDivElement ; // Đảm bảo kiểu có thể là null 
                ChangePWForm.style.display = "none";
              }
              openChangePWForm(){
                const ChangePWForm = document.getElementById("changePWForm") as HTMLDivElement ; // Đảm bảo kiểu có thể là null 
                ChangePWForm.style.display = "block";     
              }
}
