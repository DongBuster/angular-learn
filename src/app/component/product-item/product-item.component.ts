import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FeatherIconsModule } from '../icons/icons.component';
import { CartService } from '../../core/service/cart/cart.service';
import { Product } from '../../core/models/product.model.';
import { ToastService } from '../../core/service/toast/toast.service';
import { ToastComponent } from '../toast/toast.component';
@Component({
  // Khai báo selector cho component
  // có thể gọi đến selector này giống như thẻ html
  // (<app-housing-location></app-housing-location>)
  selector: 'app-housing-location',
  standalone: true,
  imports: [CommonModule, RouterModule, FeatherIconsModule],
  // Khai báo file html mà component "đại diện" (hay còn gọi là view/template của Component)
  // hoặc import file htmmlml
  templateUrl: './product-item.component.html',
  // Khai báo file style mà component này sẽ sử dụng
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent {
  @Input() product!: Product;
  constructor(
    private cartService: CartService,
    private toastService: ToastService
  ) {}

  addHouseToCart(product: Product) {
    this.cartService.AddCartList(product);
    this.toastService.Success('Đã thêm sản phẩm vào giỏ hàng');
  }
}
