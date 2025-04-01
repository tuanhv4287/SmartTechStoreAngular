import { Component, OnInit } from '@angular/core';
import { UserResponse } from '../../responses/user/user.response';
import { UserService } from '../../services/user.service';
import { TokenService } from '../../services/token.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    RouterLink,
    NgbModule,
    CommonModule,
    RouterOutlet,
    TranslateModule,
    NgIf,
    CommonModule,
    FormsModule,
    TranslateModule,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent implements OnInit {
  isPopoverOpen = false;
  adminComponent: string = 'orders';
  userResponse?: UserResponse;
  password: string = '';
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private router: Router,
    private translate: TranslateService
  ) {}
  ngOnInit() {
    this.userResponse = this.userService.getUserResponseFromLocalStorage();

    if (this.router.url === '/admin') {
      this.router.navigate(['/admin/orders']);
    }
  }
  togglePopover(event: Event): void {
    event.preventDefault();
    this.isPopoverOpen = !this.isPopoverOpen;
  }
  handleItemClick(index: number): void {
    if (index === 0) {
      const userId = this.userResponse?.id;
      this.router.navigate(['/admin/users/' + userId]);
    } else if (index === 2) {
      this.logout();
    }
    this.isPopoverOpen = false;
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
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem('language', language);
      } catch (error) {
        console.error('Error accessing localStorage:', error);
      }
    } else {
      console.error('localStorage is not available.');
    }
    this.translate.use(language);
  }
  submitForm() {
    this.closeForm();
  }
  closeForm() {
    const ChangePWForm = document.getElementById(
      'changePWForm'
    ) as HTMLDivElement;
    ChangePWForm.style.display = 'none';
  }
  openChangePWForm() {
    const ChangePWForm = document.getElementById(
      'changePWForm'
    ) as HTMLDivElement;
    ChangePWForm.style.display = 'block';
  }
}
