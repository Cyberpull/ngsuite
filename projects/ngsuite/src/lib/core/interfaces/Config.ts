import { InjectionToken } from '@angular/core';
import { NGSuiteComponent } from './Component';

export interface NGSuiteConfig {

  /**
   * Default loading animation
   */
  loadingAnimation?: NGSuiteComponent;

  /**
   * Page loading animation
   *
   * If this is `null` or `undefined`, it defaults to `loadingAnimation`
   */
  pageLoadingAnimation?: NGSuiteComponent;

  /**
   * Section loading animation
   *
   * If this is `null` or `undefined`, it defaults to `loadingAnimation`
   */
  sectionLoadingAnimation?: NGSuiteComponent;

  [key: string]: any;
}

export const NGS_CONFIG = new InjectionToken<NGSuiteConfig>("NGSuite");
