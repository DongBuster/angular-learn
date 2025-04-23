import { AuthService } from './../core/service/auth/auth.service';
import { Component, Input, Type } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from '../component/user-profile/user-profile.component';
import { SearchBarComponent } from '../component/search-bar/search-bar.component';
import { CartButtonComponent } from '../component/cart-button/cart-button.component';
import { CanComponentDeactivate } from '../core/service/guard/logoutGuard.service';

@Component({
  selector: 'app-layout',
  imports: [
    SearchBarComponent,
    CartButtonComponent,
    RouterModule,
    CommonModule,
    UserProfileComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements CanComponentDeactivate {
  currentRoute: string = '';

  constructor(private router: Router, private authService: AuthService) {
    // Theo dõi thay đổi route
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute = event.url;
      });
  }

  ngOnInit() {
    this.currentRoute = this.router.url;
  }

  canDeactivate(): boolean {
    const resultConfirm = confirm('Bạn có chắc muốn đăng xuất không?');
    if (resultConfirm) {
      this.authService.setEmptyDataLocalStorage();
      return true;
    }

    return false;
  }

  get isAuthPage(): boolean {
    return this.currentRoute === '/auth';
  }
  get isHomePage(): boolean {
    return this.currentRoute.includes('/home');
  }
  get isCartPage(): boolean {
    return this.currentRoute.includes('/cart');
  }
  get isDetailPage(): boolean {
    return this.currentRoute.includes('/detail');
  }
}
