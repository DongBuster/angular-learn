import { Component, inject } from '@angular/core';
import { FeatherIconsModule } from '../icons/icons.component';
import { Product } from '../../core/models/product.model.';
import { HomeRepository } from '../../core/repository/home.repository';
import { FilterService } from '../../core/service/filter/filter.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FeatherIconsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  productsList: Product[] = [];
  homeRepo: HomeRepository = inject(HomeRepository);
  filteredProductList: Product[] = [];
  constructor(private filterService: FilterService) {
    this.homeRepo.getAll().subscribe((productList) => {
      // console.log(productList);
      this.productsList = productList;
      this.filteredProductList = productList;
      this.filterService.updateFilteredLocations(this.filteredProductList);
    });
  }
  filterResults(text: string) {
    if (!text) this.filteredProductList = this.productsList;
    this.filteredProductList = this.productsList.filter((product) =>
      product?.title.toLowerCase().includes(text.toLowerCase())
    );
    this.filterService.updateFilteredLocations(this.filteredProductList);
  }
  ngOnDestroy() {}
}
