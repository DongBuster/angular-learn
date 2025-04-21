import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../models/product.model.';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private filteredLocationsSource = new BehaviorSubject<Product[]>([]);
  filteredLocations$ = this.filteredLocationsSource.asObservable();

  updateFilteredLocations(locations: Product[]) {
    this.filteredLocationsSource.next(locations);
  }
}
