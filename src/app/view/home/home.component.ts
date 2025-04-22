import { HomeRepository } from './../../core/repository/home.repository';
import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../../component/housing-location/housing-location.component';
import { Subscription } from 'rxjs';
import { ToastComponent } from '../../component/toast/toast.component';
import { CarouselComponent } from '../../component/carousel/carousel.component';
import { FilterHousingComponent } from '../../component/filter-housing/filter-housing.component';
import { Product } from '../../core/models/product.model.';
import { FilterService } from '../../core/service/filter/filter.service';
import { HomeService } from '../../core/service/home/home.service';
import { ToastService } from '../../core/service/toast/toast.service';
import { LoadingComponent } from '../../component/loading/loading.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HousingLocationComponent,
    ToastComponent,
    CarouselComponent,
    FilterHousingComponent,
    LoadingComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  @ViewChild(ToastComponent) toastComponent!: ToastComponent;
  isCheckedIncrease: boolean = false;
  isCheckedDecrease: boolean = false;
  filteredProductList: Product[] = [];
  skipData: number = 0;
  skipData1: number = 0;
  skipData2: number = 0;
  isLoadingInit: boolean = true;
  isLoading: boolean = false;
  private subscription: Subscription = new Subscription();

  constructor(
    private filterService: FilterService,
    private homeRepo: HomeRepository,
    private homeService: HomeService,
    private toastService: ToastService
  ) {}
  ngOnInit() {
    this.homeRepo.getAll(this.skipData).subscribe({
      next: (productList) => {
        this.filterService.updateFilteredLocations(productList);
        this.homeService.updateHomeProduct(productList);
        this.isLoadingInit = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.isLoadingInit = false;
      },
    });
    this.subscription = this.filterService.filteredLocations$.subscribe(
      (products) => {
        this.filteredProductList = products;
      }
    );
  }
  ngAfterViewInit() {
    this.toastService.register(this.toastComponent);
  }
  getIscheckedIncrease(isChecked: boolean) {
    // console.log(isChecked);
    return (this.isCheckedIncrease = isChecked);
  }
  getIscheckedDecrease(isChecked: boolean) {
    // console.log(isChecked);
    return (this.isCheckedDecrease = isChecked);
  }
  loadmore() {
    this.isLoading = true;
    // console.log('is checked increase', this.isCheckedIncrease);
    // console.log('is checked decrease', this.isCheckedDecrease);
    if (this.isCheckedDecrease == false && this.isCheckedIncrease == false) {
      this.skipData += 10;
      this.homeRepo.getAll(this.skipData).subscribe({
        next: (productList) => {
          const currentList = this.filterService.getFilteredLocations();
          // console.log(currentList);
          const mergedList = [...currentList, ...productList];
          this.filterService.updateFilteredLocations(mergedList);
          this.homeService.updateHomeProduct(mergedList);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading more products:', error);
          this.isLoading = false;
        },
      });
    } else if (this.isCheckedIncrease) {
      this.skipData1 += 10;

      this.homeRepo.getAllAsc(this.skipData1).subscribe({
        next: (productList) => {
          const currentList = this.filterService.getFilteredLocations();
          // console.log(currentList);
          const mergedList = [...currentList, ...productList];
          this.filterService.updateFilteredLocations(mergedList);
          this.homeService.updateHomeProduct(mergedList);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading more products:', error);
          this.isLoading = false;
        },
      });
    } else {
      this.skipData2 += 10;

      this.homeRepo.getAllDesc(this.skipData2).subscribe({
        next: (productList) => {
          const currentList = this.filterService.getFilteredLocations();
          // console.log(currentList);
          const mergedList = [...currentList, ...productList];
          this.filterService.updateFilteredLocations(mergedList);
          this.homeService.updateHomeProduct(mergedList);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading more products:', error);
          this.isLoading = false;
        },
      });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
