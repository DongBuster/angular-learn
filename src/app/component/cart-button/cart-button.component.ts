import { Component } from '@angular/core';
import { FeatherIconsModule } from '../icons/icons.component';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from '../../core/service/cart/cart.service';

@Component({
  selector: 'app-cart-button',
  standalone: true,
  imports: [FeatherIconsModule, RouterModule],
  templateUrl: './cart-button.component.html',
  styleUrls: ['./cart-button.component.css'],
})
export class CartButtonComponent {
  numberLength: Number = 0;
  private subscription: Subscription = new Subscription();
  constructor(private cartService: CartService) {}
  ngOnInit() {
    this.subscription = this.cartService.cartList$.subscribe((list) => {
      this.numberLength = list.length;
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
