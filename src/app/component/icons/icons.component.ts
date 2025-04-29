import { NgModule } from '@angular/core';
import { FeatherModule } from 'angular-feather';
import {
  Search,
  ShoppingCart,
  Plus,
  XCircle,
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  X,
} from 'angular-feather/icons';
const icons = {
  Search,
  ShoppingCart,
  Plus,
  XCircle,
  AlertCircle,
  CheckCircle,
  AlertTriangle,
  X,
};
@NgModule({
  imports: [FeatherModule.pick(icons)],
  exports: [FeatherModule],
})
export class FeatherIconsModule {}
