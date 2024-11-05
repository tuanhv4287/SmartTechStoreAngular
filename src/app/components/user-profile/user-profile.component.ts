import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderService } from '../../services/orderService';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { response } from 'express';
import { UserResponse } from '../../responses/user/user.response';
import { UpdateUserDTO } from '../../dtos/user/update.user.dto';
import { error } from 'console';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [HeaderComponent, FooterComponent,CommonModule,FormsModule,ReactiveFormsModule ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit{
  userProfileForm: FormGroup ;
  userResponse?: UserResponse;
  token:string = '';
  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private fb: FormBuilder,
    private orderService: OrderService,
    private userService: UserService,
    private tokenService: TokenService,
    private router: Router
  ){
    this.userProfileForm = this.fb.group({
      fullname: [''],     
      address: ['',[ Validators.minLength(3)]], 
      password: ['', [ Validators.minLength(3)]], 
      retype_password: ['', [ Validators.minLength(3)]], 
      date_of_birth: [''],
    },{
      // validators: this.passwordMatchValidator
    });

  }
  ngOnInit() {
     this.token = this.tokenService.getToken() ?? '' ;
    this.userService.getUserDetail(this.token).subscribe({
      next:(response:any)=>{
        debugger
        this.userResponse = {
          ...response,
          date_of_birth: new Date(response.date_of_birth),
        };
        this.userProfileForm.patchValue({
          fullname: response?.fullname ?? '',
          address: response?.address ?? '',
          date_of_birth: response?.date_of_birth.toISOString().substring(0, 10),
        });
        this.userService.saveUserResponseToLocalStorage(this.userResponse);
      },
      complete:()=>{
        debugger
      },
      error:(error:any)=>{
        debugger
        alert(error.error.message)
      }
    })
  }
  save(): void{
    debugger
    if(this.userProfileForm.valid){
      const updateUserDTO: UpdateUserDTO = {
        fullname: this.userProfileForm.get('fullname')?.value,
        address: this.userProfileForm.get('address')?.value,
        password: this.userProfileForm.get('password')?.value,
        retype_password: this.userProfileForm.get('retype_password')?.value,
        date_of_birth: this.userProfileForm.get('date_of_birth')?.value,
      }
      this.userService.updateUserDetail(this.token, updateUserDTO ).subscribe({
        next: (response:any)=>{
          debugger
          this.userService.removeUserFromLocalStorage();
          this.tokenService.removeToken();
          this.router.navigate(['/login'])
        },
        error:(error:any)=>{
          alert(error.error.message)
        }
      });
    }
    else{
        if(this.userProfileForm.hasError('passwordMismatch')){
          alert("Mật khẩu và mật khẩu gõ lại chưa chính xác")
        }
    }
  }

}
