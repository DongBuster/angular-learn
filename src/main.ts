/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import routesConfig from './app/route/app-routing.module';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ApiInterceptor } from './app/core/interceptor/api.interceptor';
import { ErrorInterceptor } from './app/core/interceptor/error.interceptor';
import { ErrorHandler } from '@angular/core';
import { GlobalErrorService } from './app/core/service/globalError/global-error.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routesConfig),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorService,
    },
  ],
}).catch((err) => console.error(err));
