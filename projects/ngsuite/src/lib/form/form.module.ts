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
  NGSuiteFormMessageComponent,
  NGSuiteFormMessageErrorComponent,
  NGSuiteFormMessagePendingComponent,
} from './components';

import {
  NGSuiteControlDirective,
  NGSuiteControlInfoDirective,
  NGSuiteFormInputDirective,
} from "./directives";

import {
  NGSuiteMinValidator,
  NGSuiteMaxValidator,
  NGSuiteEqualsValidator,
} from './validators';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,

    NGSuiteCoreModule,
  ],

  exports: [
    NGSuiteFormComponent,
    NGSuiteFormButtonComponent,
    NGSuiteFormFieldComponent,
    NGSuiteFormMessageComponent,
    NGSuiteFormMessageErrorComponent,
    NGSuiteFormMessagePendingComponent,
    // -----------------
    NGSuiteFormInputComponent,
    // -----------------
    NGSuiteFormInputDirective,
    NGSuiteControlDirective,
    NGSuiteControlInfoDirective,
    // Validators ------
    NGSuiteEqualsValidator,
    NGSuiteMinValidator,
    NGSuiteMaxValidator,
  ],

  declarations: [
    NGSuiteFormComponent,
    NGSuiteFormButtonComponent,
    NGSuiteFormFieldComponent,
    NGSuiteFormMessageComponent,
    NGSuiteFormMessageErrorComponent,
    NGSuiteFormMessagePendingComponent,
    // -----------------
    NGSuiteFormInputComponent,
    NGSuiteFormInputDefaultComponent,
    // -----------------
    NGSuiteFormInputDirective,
    NGSuiteControlDirective,
    NGSuiteControlInfoDirective,
    // Validators ------
    NGSuiteEqualsValidator,
    NGSuiteMinValidator,
    NGSuiteMaxValidator,
  ]
})
export class NGSuiteFormModule {}
