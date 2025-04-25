import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../core/models/product.model.';
import { HomeRepository } from '../../core/repository/home.repository';
import { FilterService } from '../../core/service/filter/filter.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-filter-housing',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-products.component.html',
  styleUrls: ['./filter-products.component.css'],
})
export class FilterProductsComponent {
  @Output() isCheckedIncrease = new EventEmitter<boolean>();
  @Output() isCheckedDecrease = new EventEmitter<boolean>();
  filterProductList: Product[] = [];
  selectedValue = 'All';
  private subscription: Subscription = new Subscription();
  increaseChecked = false;
  decreaseChecked = false;

  constructor(
    private filterService: FilterService,
    private homeRepo: HomeRepository
  ) {
    this.subscription = this.filterService.filteredLocations$.subscribe(
      (products) => {
        this.filterProductList = products;
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
      this.homeRepo.getAllAsc(0).subscribe((list) => {
        this.filterService.updateFilteredLocations(list);
      });
    } else {
      this.homeRepo.getAll(0).subscribe((list) => {
        this.filterService.updateFilteredLocations(list);
      });
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
      this.homeRepo.getAllDesc(0).subscribe((list) => {
        this.filterService.updateFilteredLocations(list);
      });
    } else {
      this.homeRepo.getAll(0).subscribe((list) => {
        this.filterService.updateFilteredLocations(list);
      });
    }
  }

  filterRange() {
    // if (this.selectedValue == 'All') {
    //   // [...this.filterProductList];
    //   this.filterService.updateFilteredLocations([...this.filterProductList]);
    // } else if (this.selectedValue == '>20000') {
    //   const min = 20000;
    //   const filterList = [...this.filterProductList].filter(
    //     (item) => item.price >= min
    //   );
    //   this.filterService.updateFilteredLocations(filterList);
    // } else {
    //   const range = this.selectedValue.split('-');
    //   const min = parseInt(range[0]);
    //   const max = parseInt(range[1]);
    //   const filterList = [...this.filterProductList].filter(
    //     (item) => item.price >= min && item.price <= max
    //   );
    //   this.filterService.updateFilteredLocations(filterList);
    // }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
