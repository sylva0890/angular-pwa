import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppBrowserModule } from './app/app.browser.module';
import { environment } from './environments/environment';

import { defineCustomElements } from '@ionic/pwa-elements/loader';
if (environment.production) {
  enableProdMode();
}

document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic().bootstrapModule(AppBrowserModule)
    .catch(err => console.log(err));
});

// Call the element loader after the platform has been bootstrapped
defineCustomElements(window);