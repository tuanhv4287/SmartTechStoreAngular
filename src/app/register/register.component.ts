import { Component, inject, ViewChild } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';
import { HttpClient,   } from '@angular/common/http';
import { Router } from '@angular/router';
import { error } from 'console';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,FormsModule,NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  @ViewChild('registerForm') registerForm!: NgForm;
  phone_number: string;
  password: string;
  retypePassword: string;
  fullName: string;
  address: string;
  isAccepted: boolean;
  dateOfBirth: Date;

  constructor(private userService: UserService, private router: Router){
    this.phone_number = '';
    this.password = '';
    this.retypePassword = '';
    this.fullName = '';
    this.address = '';
    this.isAccepted = false;
    this.dateOfBirth = new Date();
    this.dateOfBirth.setFullYear(this.dateOfBirth.getFullYear() - 18);
  }
  onPhoneChange(){
    console.log("phone",this.phone_number);
    
  }
  register(){
    const registerDTO = {
    "fullname": this.fullName,
    "phone_number": this.phone_number,
    "address": this.address,
    "password": this.password,
    "retype_password": this.retypePassword,
    "date_of_birth": this.dateOfBirth,
    "facebook_account_id": 0,
    "google_account_id":0,
    "role_id":1
}
this.userService.register(registerDTO).subscribe(
  {next: (response:any)=> {
    debugger
    this.router.navigate(['/login']);
  },
  complete: () =>{
    debugger
  },
  error: (error:any) =>{
    debugger
    alert(`Cannot register, error: ${error.error}`)
  }}
  );


  }
  checkPasswordsMatch(){
    if(this.password !== this.retypePassword){
      this.registerForm.form.controls['retypePassword'].setErrors({
        'passwordMisMatch': true
      })
    }else{
      this.registerForm.form.controls['retypePassword'].setErrors(null)
    }
  }
  checkAge(){
    if(this.dateOfBirth){
      const today = new Date();
      const birthDate = new Date(this.dateOfBirth);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if(monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())){
        age--;
        console.log(age);
        
      }
      if(age < 18){
        this.registerForm.form.controls['dateOfBirth'].setErrors({'invalidAge':true})
      }else{
        this.registerForm.form.controls['dateOfBirth'].setErrors(null)
      }
    }
  }
}
