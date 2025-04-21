import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../core/models/product.model.';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent {
  @Input() product!: Product;
  @Input() isChecked: boolean = false;
  @Output() toggleCheck = new EventEmitter<boolean>();

  onToggleCheck(event: any) {
    this.toggleCheck.emit(event.target.checked);
  }
}
