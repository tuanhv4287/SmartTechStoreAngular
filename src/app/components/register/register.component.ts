import { Component, ViewChild } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from '../header/header.component';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ FooterComponent, FormsModule, NgIf, RouterLink, TranslateModule, HeaderComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  @ViewChild('registerForm') registerForm!: NgForm;
  phoneNumber: string;
  password: string;
  retypePassword: string;
  fullName: string;
  address: string;
  isAccepted: boolean;
  dateOfBirth: Date | null;
  showPassword: Boolean = false;

  constructor(private userService: UserService, private router: Router){
    this.phoneNumber = '';
    this.password = '';
    this.retypePassword = '';
    this.fullName = '';
    this.address = '';
    this.isAccepted = false;
    this.dateOfBirth = null;
    // this.dateOfBirth.setFullYear(this.dateOfBirth.getFullYear() - 18);
  }
  onPhoneChange(){
    console.log("phone",this.phoneNumber);
    
  }
  register(){
    console.log(this.registerForm);
    this.checkPasswordsMatch();
    if (this.registerForm.invalid) {
      console.log(this.registerForm.invalid,'this.registerForm.invalid');
      
      return;
    }
    if (!this.isAccepted) {
      alert('You must agree to the terms and conditions before registering. \nBạn phải đồng ý với các điều khoản và điều kiện trước khi đăng ký.');
      return; // Dừng việc đăng ký nếu chưa đồng ý
    }
    const registerDTO = {
    "fullname": this.fullName,
    "phone_number": this.phoneNumber,
    "address": this.address,
    "password": this.password,
    "retype_password": this.retypePassword,
    "date_of_birth": this.dateOfBirth || null,
    "facebook_account_id": 0,
    "google_account_id":0,
    "role_id":1
}
this.userService.register(registerDTO).subscribe(
  {next: (response:any)=> {
    
    this.router.navigate(['/login']);
  },
  complete: () =>{
    
  },
  error: (error:any) =>{
    
    alert(`${error.error.message}`);
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
  togglePasswordVisibility(){
    this.showPassword = !this.showPassword;
  }
}
