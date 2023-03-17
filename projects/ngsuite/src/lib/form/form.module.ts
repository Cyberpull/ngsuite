import { NgModule } from "@angular/core";
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
    NGSuiteCoreModule
  ],

  exports: [
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
