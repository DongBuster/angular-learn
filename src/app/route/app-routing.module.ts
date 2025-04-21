import { Routes } from '@angular/router';

const routesConfig: Routes = [
  {
    path: 'auth',
    loadComponent: () =>
      import('../view/auth/authPage.component').then((c) => c.AuthComponent),
  },
  {
    path: '',
    loadComponent: () =>
      import('../layout/layout.component').then((c) => c.LayoutComponent),
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
