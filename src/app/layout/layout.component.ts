import { Component, Input, Type } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from '../component/user-profile/user-profile.component';
import { SearchBarComponent } from '../component/search-bar/search-bar.component';
import { CartButtonComponent } from '../component/cart-button/cart-button.component';

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
export class LayoutComponent {
  currentRoute: string = '';

  // private toastService: ToastService

  // ngAfterViewInit() {
  //   this.toastService.register(this.toastComponent);
  // }
  constructor(private router: Router) {
    // Theo dõi thay đổi route
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute = event.url;
      });
  }

  ngOnInit() {
    const isLogined = localStorage.getItem('login');
    if (isLogined === 'true') {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/auth']);
    }
    this.currentRoute = this.router.url;
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
