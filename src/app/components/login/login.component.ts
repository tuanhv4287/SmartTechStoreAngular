import { Component,OnInit,ViewChild } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { LoginDTO } from '../../dtos/user/login.dto';
import { LoginReponse } from '../../responses/user/LoginReponse';
import { TokenService } from '../../services/token.service';
import { RoleService } from '../../services/role.service';
import { Role } from '../../models/role';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule,NgFor],
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

  constructor(
    private userService: UserService, 
    private router: Router,
    private tokenService: TokenService,
    private roleService: RoleService
  ){
    this.phoneNumber = '';
    this.password = '';
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
      
      next: (response: LoginReponse)=> {
        const {token} = response;
        if(this.rememberMe){
          this.tokenService.setToken(token)
        }
        // this.router.navigate(['/login']);
      },
      complete:()=>{
      },
      error: (error: any)=> {
        alert(`Cannot login, error: ${error.error}`)
      }
    })
  }
}
