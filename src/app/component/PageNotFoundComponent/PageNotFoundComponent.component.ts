import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './PageNotFoundComponent.component.html',
  styleUrls: ['./PageNotFoundComponent.component.css'],
})
export class PageNotFoundComponentComponent {
  constructor() {}

  goBack() {
    window.history.back();
  }
}
