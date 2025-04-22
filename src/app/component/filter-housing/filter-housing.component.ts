import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../core/models/product.model.';
import { HomeRepository } from '../../core/repository/home.repository';
import { FilterService } from '../../core/service/filter/filter.service';
import { HomeService } from '../../core/service/home/home.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-filter-housing',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-housing.component.html',
  styleUrls: ['./filter-housing.component.css'],
})
export class FilterHousingComponent {
  @Output() isCheckedIncrease = new EventEmitter<boolean>();
  @Output() isCheckedDecrease = new EventEmitter<boolean>();
  productList: Product[] = [];
  homeRepo: HomeRepository = inject(HomeRepository);
  filterHousingList: Product[] = [];
  selectedValue = 'All';
  private subscription: Subscription = new Subscription();
  increaseChecked = false;
  decreaseChecked = false;

  constructor(
    private filterService: FilterService,
    private homeService: HomeService
  ) {
    this.homeService.homeProduct$.subscribe((productList) => {
      this.productList = productList;
      this.filterHousingList = productList;
    });
    this.subscription = this.filterService.filteredLocations$.subscribe(
      (products) => {
        this.filterHousingList = products;
      }
    );
  }

  filterIncrease(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;

    // Nếu đang check tăng và checkbox giảm đang được check
    if (isChecked && this.decreaseChecked) {
      this.decreaseChecked = false;
      this.isCheckedDecrease.emit(false);
    }

    this.increaseChecked = isChecked;
    this.isCheckedIncrease.emit(isChecked);

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

    // Nếu đang check giảm và checkbox tăng đang được check
    if (isChecked && this.increaseChecked) {
      this.increaseChecked = false;
      this.isCheckedIncrease.emit(false);
    }

    this.decreaseChecked = isChecked;
    this.isCheckedDecrease.emit(isChecked);

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
      this.filterHousingList = [...this.productList];
      this.filterService.updateFilteredLocations(this.filterHousingList);
    } else {
      const range = this.selectedValue.split('-');
      const min = parseInt(range[0]);
      const max = parseInt(range[1]);
      this.filterHousingList = [...this.productList].filter(
        (item) => item.price >= min && item.price <= max
      );
      this.filterService.updateFilteredLocations(this.filterHousingList);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
