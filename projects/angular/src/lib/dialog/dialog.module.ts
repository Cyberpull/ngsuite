import { NgModule } from "@angular/core";
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
    NGSuiteCoreModule,
    NGSuiteFormModule,
  ],

  exports: [
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
