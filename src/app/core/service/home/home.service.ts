import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../models/product.model.';
@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private homeProductSource = new BehaviorSubject<Product[]>([]);
  homeProduct$ = this.homeProductSource.asObservable();

  updateHomeProduct(locations: Product[]) {
    this.homeProductSource.next(locations);
  }
}
