import { Routes } from '@angular/router';
import { AuthGuard } from '../core/service/guard/authGuard.service';
import { CanDeactivateGuard } from '../core/service/guard/logoutGuard.service';
import { preventBackButtonGuard } from '../core/service/guard/prevent-back-button.guard';

const routesConfig: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('../view/auth/login/loginPage.component').then(
        (c) => c.LoginPageComponent
      ),
    canActivate: [AuthGuard],
    // canDeactivate: [preventBackButtonGuard],
  },
  {
    path: 'register',
    loadComponent: () =>
      import('../view/auth/register/registerPage.component').then(
        (c) => c.RegisterPageComponent
      ),
    canActivate: [AuthGuard],
    // canDeactivate: [preventBackButtonGuard],
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
