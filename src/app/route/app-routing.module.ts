import { Routes } from '@angular/router';
import { AuthGuard } from '../core/service/guard/authGuard.service';
import { CanDeactivateGuard } from '../core/service/guard/logoutGuard.service';
import { AuthGuard as AuthDeactivateGuard } from '../core/guards/auth.guard';

const routesConfig: Routes = [
  {
    path: 'auth',
    loadComponent: () =>
      import('../view/auth/authPage.component').then((c) => c.AuthComponent),
    canActivate: [AuthGuard],
    canDeactivate: [AuthDeactivateGuard]
  },
  {
    path: '',
    loadComponent: () =>
      import('../layout/layout.component').then((c) => c.LayoutComponent),
    canDeactivate: [CanDeactivateGuard],
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('../view/home/home.component').then((c) => c.HomeComponent),
      },
      {
        path: 'detail/:id',
        loadComponent: () =>
          import('../view/detail-housing/detail-housing.component').then(
            (c) => c.DetailHousingComponent
          ),
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('../view/cart-housing/cart-housing.component').then(
            (c) => c.CartHousingComponent
          ),
      },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
    ],
  },

  {
    path: '**',
    loadComponent: () =>
      import(
        '../component/PageNotFoundComponent/PageNotFoundComponent.component'
      ).then((c) => c.PageNotFoundComponentComponent),
  },
];

export default routesConfig;
