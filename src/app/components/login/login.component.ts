import { Component,OnInit,ViewChild } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { FormBuilder, FormsModule, NgForm, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { LoginDTO } from '../../dtos/user/login.dto';
import { LoginResponse } from '../../responses/user/login.response';
import { TokenService } from '../../services/token.service';
import { RoleService } from '../../services/role.service';
import { Role } from '../../models/role';
import { NgFor, NgIf } from '@angular/common';
import { UserResponse } from '../../responses/user/user.response';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule, NgFor, NgIf, RouterLink, TranslateModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  @ViewChild('loginForm') loginForm!: NgForm;
  phoneNumber: string = '';
  password: string = '';
  roleAuto: number = 0;

  roles: Role[]=[];
  rememberMe: boolean = true;
  selectedRole: Role | undefined;
  userResponse?: UserResponse;
  showPassword: boolean = false;

  constructor(
    private userService: UserService, 
    private router: Router,
    private tokenService: TokenService,
    private roleService: RoleService,

  ){
    // login user
    // this.phoneNumber = '0987676762';
    // this.password = '11223344';
    //login admin
    // this.phoneNumber = '0981772415';
    // this.password = '123456';
    
  }
  ngOnInit(): void {
   
    this.roleService.getRoles().subscribe({
      next: (roles: Role[]) =>{
        this.roles = roles;
        this.selectedRole = roles.length > 0 ? roles[0]: undefined;
      }
    })
  }
  onPhoneChange(){
    console.log("phone",this.phoneNumber);
    
  }
  fillAccount(event: any ){ 
    if(event.target.value === 'user'){
      this.phoneNumber = '0988336554';
      this.password = '123456';
      this.roleAuto = 1
      return;
    }
    this.phoneNumber = '0981772415';
    this.password = '123456';
    this.roleAuto = 2

  }

  
  login(){
    if (this.loginForm.invalid) {
      return;
    }
    const message = `phone: ${this.phoneNumber}`+ `password: ${this.password}`;
    const loginDTO: LoginDTO = {
      phone_number: this.phoneNumber,
      password: this.password,
      role_id: this.selectedRole?.id ?? this.roleAuto
    }
    console.log(loginDTO);
    if(this.roleAuto != 0){
      loginDTO.role_id = this.roleAuto
    }
    this.userService.login(loginDTO).subscribe({
      
      next: (response: LoginResponse)=> {
        const {token} = response;
        if(this.rememberMe){
          this.tokenService.setToken(token)
          this.userService.getUserDetail(token).subscribe({
            next:(response:any) => { 
              
              this.userResponse = {
                ...response,
                date_of_birth: new Date(response.date_of_birth),
              };
              this.userService.saveUserResponseToLocalStorage(this.userResponse);
              if(this.userResponse?.role.name == 'admin') {
                this.router.navigate(['/admin']);
              }
              else if(this.userResponse?.role.name == 'user'){
                this.router.navigate(['/']);
              }
            }
          })
        }
        
      },
      complete:()=>{
      },
      error: (error: any)=> {
        alert(`${error.error.message}`)
      }
    })
  }
  togglePasswordVisibility(){
    this.showPassword = !this.showPassword;
  }
}
