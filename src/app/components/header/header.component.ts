import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserResponse } from '../../responses/user/user.response';
import { NgIf } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TokenService } from '../../services/token.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgIf, NgbModule, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  userResponse?: UserResponse | null;
  isPopoverOpen = false;
  isMobile: boolean = false;
  navMobile: boolean = false;
  togglePopover(event: Event): void {
    event.preventDefault();
    this.isPopoverOpen = !this.isPopoverOpen;
  }
  handleItemClick(index: number): void {
    if (index === 0) {
      this.router.navigate(['/user-profile']);
    } else if (index === 1) {
      this.router.navigate(['/orders/', this.userResponse?.id]);
    } else if (index === 2) {
      this.cartService.clearCart();
      this.userService.removeUserFromLocalStorage();
      this.tokenService.removeToken();
      this.userResponse = this.userService.getUserResponseFromLocalStorage();
    }
    this.isPopoverOpen = false;
  }
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private router: Router,
    private translate: TranslateService,
    private cartService: CartService
  ) {
    this.checkScreenSize();
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  ngOnInit() {
    this.userResponse = this.userService.getUserResponseFromLocalStorage();
    if (this.userResponse?.role.name == 'admin') {
      this.router.navigate(['/admin']);
    }
  }
  toggleMenu() {
    this.navMobile = !this.navMobile;
  }
  checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
  }
  switchLanguage(language: string) {
    if (
      typeof window !== 'undefined' &&
      typeof window.localStorage !== 'undefined'
    ) {
      try {
        localStorage.setItem('language', language);
      } catch (error) {
        console.error('Error accessing localStorage:', error);
      }
    } else {
      console.log('localStorage is not available in this environment.');
    }
    this.translate.use(language);
  }
}
