import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode, provideAppInitializer, inject,
} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideServiceWorker} from '@angular/service-worker';
import {provideAnimations} from '@angular/platform-browser/animations';
import {KeycloakService} from './utils/keycloak/keycloak.service';
import {provideHttpClient} from '@angular/common/http';
// import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
// import { MyHammerConfig } from './hammer.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideAnimations(),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideAppInitializer(() => {
      const initFn = ((key: KeycloakService) => {
        return () => key.init()
      })(inject(KeycloakService));
      return initFn();
    }),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    // {
    //   provide: HAMMER_GESTURE_CONFIG,
    //   useClass: MyHammerConfig
    // }
  ],
};
