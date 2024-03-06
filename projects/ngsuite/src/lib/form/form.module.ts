import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";

import { NGSuiteCoreModule } from "../core";

import {
  NGSuiteFormComponent,
  NGSuiteFormButtonComponent,
  NGSuiteFormFieldComponent,
  NGSuiteFormInputComponent,
  NGSuiteFormInputDefaultComponent,
} from './components';

import {
  NGSuiteFormInputDirective,
} from "./directives";

import {
  NGSuiteMinValidator,
  NGSuiteMaxValidator,
} from './validators';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,

    NGSuiteCoreModule
  ],

  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,

    NGSuiteCoreModule,
    // -----------------
    NGSuiteFormComponent,
    NGSuiteFormButtonComponent,
    NGSuiteFormFieldComponent,
    // -----------------
    NGSuiteFormInputComponent,
    // -----------------
    NGSuiteFormInputDirective,
    // Validators ------
    NGSuiteMinValidator,
    NGSuiteMaxValidator,
  ],

  declarations: [
    NGSuiteFormComponent,
    NGSuiteFormButtonComponent,
    NGSuiteFormFieldComponent,
    // -----------------
    NGSuiteFormInputComponent,
    NGSuiteFormInputDefaultComponent,
    // -----------------
    NGSuiteFormInputDirective,
    // Validators ------
    NGSuiteMinValidator,
    NGSuiteMaxValidator,
  ]
})
export class NGSuiteFormModule {}
