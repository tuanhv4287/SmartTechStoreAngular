import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserResponse } from '../../responses/user/user.response';
import { NgIf } from '@angular/common';
// import {NgbPopover } from '@ng-bootstrap/ng-bootstrap/popover/popover';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  userResponse?:UserResponse | null;
  isPopoverOpen = false;
  togglePopover(event: Event): void{
    event.preventDefault();
    this.isPopoverOpen = !this.isPopoverOpen;
  }
  handleItemClick(index: number): void{
    if(index === 2){
      this.isPopoverOpen = false;
    }
  }
  constructor( 
    private userService: UserService,
    // private popoverConfig: NgbPopoverConfig
  ){}
  ngOnInit() {
    this.userResponse = this.userService.getUserResponseToLocalStorage();
  }

}
