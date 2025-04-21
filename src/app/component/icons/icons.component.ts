import { NgModule } from '@angular/core';
import { FeatherModule } from 'angular-feather';
import { Search, ShoppingCart, Plus } from 'angular-feather/icons';
const icons = {
  Search,
  ShoppingCart,
  Plus,
};
@NgModule({
  imports: [FeatherModule.pick(icons)],
  exports: [FeatherModule],
})
export class FeatherIconsModule {}
