import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { Registry } from './core/Registry';

import { NGSuiteCoreModule, NGSuiteConfig } from './core';
import { NGSuiteDialogModule } from './dialog';
import { NGSuiteGuardModule } from './guard';

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
  ],

  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,

    NGSuiteCoreModule,
    NGSuiteDialogModule,
    NGSuiteGuardModule,
  ],
})
export class NGSuiteModule {

  static forRoot(config?: NGSuiteConfig): ModuleWithProviders<any> {
    if (!config) config = {};

    return {
      ngModule: NGSuiteModule,
      providers: Registry.entries([
        { provide: 'NGSuite', useValue: config }
      ])
    };
  }

}
