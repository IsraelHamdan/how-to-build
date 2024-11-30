import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { AuthHttpInterceptor, provideAuth0 } from '@auth0/auth0-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(BrowserAnimationsModule),
    provideHttpClient(),
    provideAuth0({
      domain: 'dev-qj5svwcz8goxynls.us.auth0.com',
      clientId: '8LlJU37LZwuBmIMCKJd7ihnirBe3LDa8',
      authorizationParams: {
        redirect_uri: window.location.origin,
        scope: 'openId profile email read:user user:email',
        audience: 'https://dev-qj5svwcz8goxynls.us.auth0.com/api/v2/',
      },
    }),
  ],
};
