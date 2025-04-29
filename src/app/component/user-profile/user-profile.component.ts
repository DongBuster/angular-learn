import { Component, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
declare var google: any;

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent {
  isDropdownOpen = false;
  username = '';
  avatarUrl = '';

  constructor(private router: Router, private elementRef: ElementRef) {}

  ngOnInit() {
    if (sessionStorage.getItem('loggedInUser') != null) {
      this.username =
        JSON.parse(sessionStorage.getItem('loggedInUser')!).name ?? '';
      this.avatarUrl =
        JSON.parse(sessionStorage.getItem('loggedInUser')!).picture ?? '';
    } else {
      this.username = localStorage.getItem('userName') ?? '';
      this.avatarUrl = localStorage.getItem('imageUrl') ?? '';
    }
    // console.log(this.avatarUrl);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false;
    }
  }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout() {
    if (sessionStorage.getItem('loggedInUser') != null) {
      google.accounts.id.disableAutoSelect();
    }
    // Navigate to login page and replace the current history entry
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
