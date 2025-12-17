import { Injectable } from '@angular/core';
import {
  getRemoteConfig,
  fetchAndActivate,
  getValue,
  RemoteConfig,
} from 'firebase/remote-config';
import { getApp } from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class FirebaseRemoteConfigService {
  private remoteConfig: RemoteConfig;

  private lastFlagValue?: boolean;

  constructor() {
    this.remoteConfig = getRemoteConfig(getApp());

    this.remoteConfig.settings = {
      fetchTimeoutMillis: 60000,
      minimumFetchIntervalMillis: 0,
    };

    this.remoteConfig.defaultConfig = {
      enable_categories: true,
    };
  }

  async loadFeatureFlags(): Promise<void> {
    try {
      await fetchAndActivate(this.remoteConfig);
      console.log('Remote Config cargado');
    } catch (error) {
      console.error('Error cargando Remote Config', error);
    }
  }

  getShowCategoriesFlag(): boolean {
    return getValue(this.remoteConfig, 'enable_categories').asBoolean();
  }

  async refreshFlagsIfChanged(): Promise<boolean> {
    await fetchAndActivate(this.remoteConfig);
    const current = this.getShowCategoriesFlag();

    if (this.lastFlagValue !== current) {
      this.lastFlagValue = current;
      return true;
    }

    return false;
  }
}
