import { Subscription } from 'rxjs';
import { HomeRepository } from './../../core/repository/home.repository';
import { Component } from '@angular/core';
import { FeatherIconsModule } from '../icons/icons.component';
import { Product } from '../../core/models/product.model.';
import { FilterService } from '../../core/service/filter/filter.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FeatherIconsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  private subscription: Subscription = new Subscription();
  constructor(
    private filterService: FilterService,
    private homeRepo: HomeRepository
  ) {}
  filterResults(text: string) {
    if (!text) {
      this.homeRepo.getAll(0).subscribe((list) => {
        this.filterService.updateFilteredLocations(list);
      });
    } else {
      this.homeRepo.getProductWithSearch(text).subscribe((list) => {
        this.filterService.updateFilteredLocations(list);
      });
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
