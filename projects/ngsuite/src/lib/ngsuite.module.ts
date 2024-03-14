import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { Registry } from './core/Registry';

import { NGSuiteCoreModule, NGSuiteConfig } from './core';
import { NGSuiteDialogModule } from './dialog';
import { NGSuiteGuardModule } from './guard';
import { NGSuiteFormModule } from "./form";

import { NGSuiteRootComponent } from "./root";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,

    NGSuiteCoreModule,
    NGSuiteDialogModule,
    NGSuiteGuardModule,
    NGSuiteFormModule,
  ],

  exports: [
    NGSuiteCoreModule,
    NGSuiteDialogModule,
    NGSuiteGuardModule,
    NGSuiteFormModule,

    // Root Component
    NGSuiteRootComponent,
  ],

  declarations: [
    NGSuiteRootComponent,
  ],
})
export class NGSuiteModule {

  static forRoot(config?: NGSuiteConfig): ModuleWithProviders<NGSuiteModule> {
    if (!config) config = {};

    return {
      ngModule: NGSuiteModule,
      providers: Registry.entries([
        { provide: 'NGSuite', useValue: config }
      ])
    };
  }

}
