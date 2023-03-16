import { NgModule, ModuleWithProviders } from "@angular/core";

import { Registry } from './core/Registry';

import { NGSuiteCoreModule, NGSuiteConfig } from './core';
import { NGSuiteDialogModule } from './dialog';
import { NGSuiteGuardModule } from './guard';

@NgModule({
  imports: [
    NGSuiteCoreModule,
    NGSuiteDialogModule,
    NGSuiteGuardModule,
  ],

  exports: [
    NGSuiteCoreModule,
    NGSuiteDialogModule,
    NGSuiteGuardModule,
  ],
})
export class NGSuiteModule {

  static forRoot(config: NGSuiteConfig): ModuleWithProviders<any> {
    return {
      ngModule: NGSuiteModule,
      providers: Registry.entries([
        { provide: 'NGSuite', useValue: config }
      ])
    };
  }

}
