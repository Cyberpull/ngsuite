import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";

import { NGSuiteCoreModule } from "../core";
import { NGSuiteFormModule } from "../form";

import {
  NGSuiteDialogBodyComponent,
  NGSuiteDialogComponent,
  NGSuiteDialogFooterComponent,
  NGSuiteDialogHeaderComponent,
  NGSuiteDialogRootComponent
} from "./components";

import {
  NGSuiteDialogAlertComponent,
  NGSuiteDialogConfirmComponent,
} from "./popup";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,

    NGSuiteCoreModule,
    NGSuiteFormModule,
  ],

  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,

    NGSuiteCoreModule,
    NGSuiteFormModule,

    NGSuiteDialogBodyComponent,
    NGSuiteDialogFooterComponent,
    NGSuiteDialogHeaderComponent,
  ],

  declarations: [
    NGSuiteDialogComponent,
    NGSuiteDialogBodyComponent,
    NGSuiteDialogFooterComponent,
    NGSuiteDialogHeaderComponent,
    NGSuiteDialogRootComponent,

    NGSuiteDialogAlertComponent,
    NGSuiteDialogConfirmComponent,
  ],
})
export class NGSuiteDialogModule {  }
