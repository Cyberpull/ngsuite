import { NGSuiteComponent } from './Component';

export interface NGSuiteConfig {
  pageLoadingAnimation?: NGSuiteComponent;
  sectionLoadingAnimation?: NGSuiteComponent;

  [key: string]: any;
}
