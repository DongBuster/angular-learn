import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../models/product.model.';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSource = new BehaviorSubject<Product[]>([]);
  cartList$ = this.cartSource.asObservable();
  private currentCart: Product[] = [];

    
  UpdateCartList(locations: Product[]) {
    this.cartSource.next(locations);
  }
  AddCartList(location: Product) {
    const exists = this.currentCart.some(item => item.id === location.id);
    if (!exists) {
      this.currentCart.push(location);
      this.cartSource.next(this.currentCart);
    }
  }
  RemoveCartList(location: Product) {
    this.currentCart = this.currentCart.filter(item => item.id !== location.id);
    this.cartSource.next(this.currentCart);
  }
  
} 