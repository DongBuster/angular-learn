import { Component, inject } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Product } from '../../core/models/product.model.';
import { HomeRepository } from '../../core/repository/home.repository';
import { FilterService } from '../../core/service/filter/filter.service';

@Component({
  selector: 'app-filter-housing',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './filter-housing.component.html',
  styleUrls: ['./filter-housing.component.css'],
})
export class FilterHousingComponent {
  housingLocationList: Product[] = [];
  homeRepo: HomeRepository = inject(HomeRepository);
  filterHousingList: Product[] = [];
  selectedValue = 'All';
  constructor(private filterService: FilterService) {
    this.homeRepo.getAll().subscribe((productList) => {
      this.housingLocationList = productList;
      this.filterHousingList = productList;
      this.filterService.updateFilteredLocations(this.filterHousingList);
    });
  }

  filterIncrease(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      const list = [...this.filterHousingList].sort(
        (a, b) => a.price - b.price
      );
      this.filterService.updateFilteredLocations(list);
    } else {
      this.filterService.updateFilteredLocations(this.filterHousingList);
    }
  }
  filterDecrease(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      const list = [...this.filterHousingList].sort(
        (a, b) => b.price - a.price
      );
      this.filterService.updateFilteredLocations(list);
    } else {
      this.filterService.updateFilteredLocations(this.filterHousingList);
    }
  }

  filterRange() {
    if (this.selectedValue == 'All') {
      this.filterHousingList = [...this.housingLocationList];
      this.filterService.updateFilteredLocations(this.filterHousingList);
    } else {
      const range = this.selectedValue.split('-');
      const min = parseInt(range[0]);
      const max = parseInt(range[1]);
      this.filterHousingList = [...this.housingLocationList].filter(
        (item) => item.price >= min && item.price <= max
      );
      this.filterService.updateFilteredLocations(this.filterHousingList);
    }
  }
}
