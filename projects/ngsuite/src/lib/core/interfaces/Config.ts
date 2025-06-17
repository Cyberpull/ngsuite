import { InjectionToken } from '@angular/core';
import { NGSuiteComponent } from './Component';
import { ButtonTheme } from '../../form';

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

  /**
   * Default alert button theme
   *
   * If this is `undefined`, it defaults to `primary`
   */
  defaultAlertButtonTheme?: ButtonTheme;

  /**
   * Default confirm dialog button theme
   *
   * If this is `undefined`, it defaults to `primary`
   */
  defaultConfirmButtonTheme?: ButtonTheme;

  [key: string]: any;
}

export const NGS_CONFIG = new InjectionToken<NGSuiteConfig>("NGSuite");
