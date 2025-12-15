import { Injectable } from '@angular/core';
import { RemoteConfig, getRemoteConfig, getValue, fetchAndActivate } from 'firebase/remote-config';
import { initializeApp } from 'firebase/app';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseRemoteConfigService {

  private remoteConfig!: RemoteConfig;

  constructor() {
    this.init();
  }

  private init() {
    const app = initializeApp(environment.firebase);
    this.remoteConfig = getRemoteConfig(app);

    this.remoteConfig.defaultConfig = {
      show_categories: environment.featureFlags.showCategories
    };
  }

  async loadFeatureFlags(): Promise<void> {
    try {
      await fetchAndActivate(this.remoteConfig);
    } catch {}
  }

  getShowCategoriesFlag(): boolean {
    const value = getValue(this.remoteConfig, 'show_categories');
    return value.asBoolean();
  }
}
