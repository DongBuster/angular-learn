import { HomeRepository } from './../../core/repository/home.repository';
import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductItemComponent } from '../../component/product-item/product-item.component';
import { Subscription } from 'rxjs';
import { ToastComponent } from '../../component/toast/toast.component';
import { CarouselComponent } from '../../component/carousel/carousel.component';
import { FilterProductsComponent } from '../../component/filter-products/filter-products.component';
import { Product } from '../../core/models/product.model.';
import { FilterService } from '../../core/service/filter/filter.service';
import { HomeService } from '../../core/service/home/home.service';
import { LoadingComponent } from '../../component/loading/loading.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ProductItemComponent,
    ToastComponent,
    CarouselComponent,
    FilterProductsComponent,
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
    private homeService: HomeService
  ) {}

  ngOnInit() {
    this.isLoadingInit = true;
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

  getIscheckedIncrease(isChecked: boolean) {
    this.isLoadingInit = true;
    this.isCheckedIncrease = isChecked;
    setTimeout(() => {
      this.isLoadingInit = false;
    }, 800);
  }

  getIscheckedDecrease(isChecked: boolean) {
    this.isLoadingInit = true;
    this.isCheckedDecrease = isChecked;
    setTimeout(() => {
      this.isLoadingInit = false;
    }, 800);
  }

  loadmore() {
    this.isLoading = true;
    if (this.isCheckedDecrease == false && this.isCheckedIncrease == false) {
      this.skipData += 20;
      this.homeRepo.getAll(this.skipData).subscribe({
        next: (productList) => {
          const currentList = this.filterService.getFilteredLocations();
          const mergedList = [...currentList, ...productList];
          this.filterService.updateFilteredLocations(mergedList);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading more products:', error);
          this.isLoading = false;
        },
      });
    } else if (this.isCheckedIncrease) {
      this.skipData1 += 20;
      this.homeRepo.getAllAsc(this.skipData1).subscribe({
        next: (productList) => {
          const currentList = this.filterService.getFilteredLocations();
          const mergedList = [...currentList, ...productList];
          this.filterService.updateFilteredLocations(mergedList);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading more products:', error);
          this.isLoading = false;
        },
      });
    } else {
      this.skipData2 += 20;
      this.homeRepo.getAllDesc(this.skipData2).subscribe({
        next: (productList) => {
          const currentList = this.filterService.getFilteredLocations();
          const mergedList = [...currentList, ...productList];
          this.filterService.updateFilteredLocations(mergedList);
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
