import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { 
  HttpClientModule, 
  HTTP_INTERCEPTORS 
} from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { adminRoutes } from './components/admin/admin-router';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    importProvidersFrom(RouterModule.forChild(adminRoutes)),
    provideClientHydration(), 
    provideHttpClient(withInterceptors([TokenInterceptor]),withFetch(),),
    provideAnimations()
    
    
  ]
};