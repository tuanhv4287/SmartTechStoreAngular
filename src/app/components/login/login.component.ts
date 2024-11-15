import { Component,OnInit,ViewChild } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { LoginDTO } from '../../dtos/user/login.dto';
import { LoginResponse } from '../../responses/user/login.response';
import { TokenService } from '../../services/token.service';
import { RoleService } from '../../services/role.service';
import { Role } from '../../models/role';
import { NgFor } from '@angular/common';
import { UserResponse } from '../../responses/user/user.response';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule, NgFor, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  @ViewChild('loginForm') loginForm!: NgForm;

  phoneNumber: string;
  password: string;

  roles: Role[]=[];
  rememberMe: boolean = true;
  selectedRole: Role | undefined;
  userResponse?: UserResponse

  constructor(
    private userService: UserService, 
    private router: Router,
    private tokenService: TokenService,
    private roleService: RoleService
  ){
    // login user
    // this.phoneNumber = '0987676762';
    // this.password = '11223344';
    //login admin
    this.phoneNumber = '0981772415';
    this.password = '123456';
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
  login(){
    const message = `phone: ${this.phoneNumber}`+ `password: ${this.password}`;
    const loginDTO: LoginDTO = {
      phone_number: this.phoneNumber,
      password: this.password,
      role_id: this.selectedRole?.id ?? 1
    }
    this.userService.login(loginDTO).subscribe({
      
      next: (response: LoginResponse)=> {
        const {token} = response;
        if(this.rememberMe){
          this.tokenService.setToken(token)
          this.userService.getUserDetail(token).subscribe({
            next:(response:any) => { 
              debugger
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
        alert(`Cannot login, error: ${error.error}`)
      }
    })
  }
}
