import { Component, OnInit, ViewChild } from '@angular/core';
import { UserResponse } from '../../../responses/user/user.response';
import { Role } from '../../../models/role';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { FormsModule, NgForm } from '@angular/forms';
import { UpdateUserDTO } from '../../../dtos/user/update.user.dto';
import { TokenService } from '../../../services/token.service';

@Component({
  selector: 'app-edit-user-admin',
  standalone: true,
  imports: [NgIf,RouterLink, FormsModule],
  templateUrl: './edit-user-admin.component.html',
  styleUrl: './edit-user-admin.component.scss'
})
export class EditUserAdminComponent implements OnInit{
  @ViewChild('updateAccountForm') updateAccountForm!: NgForm;
  userId:number = 0;
  user: any;
  phoneNumber: string = '';
  fullName: string= '';
  address: string= '';
  token:string = '';

  userResponse: UserResponse = {
      id: 0, // Hoặc bất kỳ giá trị số nào bạn muốn
      fullname: '',
      phone_number: '',
      address: '',
      password: '',
      date_of_birth: new Date(),
      is_active: false,
      facebook_account_id: 0, 
      google_account_id: 0, 
      email: '',
      role: {id:1,name:"user"}
  };  
constructor(private route: ActivatedRoute, 
            private router: Router, 
            private userService: UserService,
            private tokenService: TokenService,
){}
ngOnInit(): void {
  this.token = this.tokenService.getToken() ?? '' ;
  this.getUserDetails() 
this.user = window.history.state.user;  // Truy cập state qua window.history.state


this.userService.getUserDetail(this.token).subscribe({
  next:(response:any) => { 
    
    this.userResponse = {
      ...response,
      date_of_birth: new Date(response.date_of_birth),
    };
    this.fullName = this.userResponse.fullname
    this.phoneNumber = this.userResponse.phone_number
    this.address = this.userResponse.address
    console.log(this.userResponse,'this.userResponse');
},
complete:()=>{
},
error: (error: any)=> {
alert(`${error.error.message}`)
}
});
}
getUserDetails(): void {
  this.userId = Number(this.route.snapshot.paramMap.get('id')); 
}

update(){
        const updateUserDTO: UpdateUserDTO = {
          fullname: this.fullName,
          address: this.address,
          phone_number: this.phoneNumber,
          password: '',
          retype_password: '',
          date_of_birth: null
        }
        this.userService.updateUserDetail(this.token, updateUserDTO ).subscribe({
          next: (response:any)=>{
            this.router.navigate(['../'], { relativeTo: this.route });
          },
          error:(error:any)=>{
            alert(error.error.message)
          }
        });
      }
}
