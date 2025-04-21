import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../../component/housing-location/housing-location.component';
import { Subscription } from 'rxjs';
import { ToastComponent } from '../../component/toast/toast.component';
import { CarouselComponent } from '../../component/carousel/carousel.component';
import { FilterHousingComponent } from '../../component/filter-housing/filter-housing.component';
import { Product } from '../../core/models/product.model.';
import { FilterService } from '../../core/service/filter/filter.service';
import { ToastService } from '../../core/service/toast/toast.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HousingLocationComponent,
    ToastComponent,
    CarouselComponent,
    FilterHousingComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  filteredProductList: Product[] = [];
  private subscription: Subscription = new Subscription();
  @ViewChild(ToastComponent) toastComponent!: ToastComponent;

  constructor(
    private filterService: FilterService,
    private toastService: ToastService
  ) {}
  ngOnInit() {
    this.subscription = this.filterService.filteredLocations$.subscribe(
      (products) => {
        this.filteredProductList = products;
      }
    );
  }
  ngAfterViewInit() {
    this.toastService.register(this.toastComponent);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
