import { CommonModule } from "@angular/common";
import { Injector, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import {
  NGSuiteContainerComponent,
  NGSuiteIconComponent,
  NGSuiteLoadingAnimationComponent,
  NGSuiteLoadingPageComponent,
  NGSuiteLoadingRootComponent,
  NGSuiteLoadingSectionComponent,
  NGSuitePaginationComponent,
  NGSuitePaginationInfoComponent,
  NGSuitePanelBodyComponent,
  NGSuitePanelComponent,
  NGSuitePanelFooterComponent,
  NGSuitePanelHeaderComponent
} from "./components";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],

  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,

    NGSuiteIconComponent,

    NGSuitePanelComponent,
    NGSuitePanelBodyComponent,
    NGSuitePanelFooterComponent,
    NGSuitePanelHeaderComponent,

    NGSuiteContainerComponent,

    NGSuiteLoadingSectionComponent,

    NGSuitePaginationComponent,
  ],

  declarations: [
    NGSuiteIconComponent,

    NGSuitePanelComponent,
    NGSuitePanelBodyComponent,
    NGSuitePanelFooterComponent,
    NGSuitePanelHeaderComponent,

    NGSuiteContainerComponent,

    NGSuiteLoadingAnimationComponent,
    NGSuiteLoadingSectionComponent,
    NGSuiteLoadingPageComponent,
    NGSuiteLoadingRootComponent,

    NGSuitePaginationComponent,
    NGSuitePaginationInfoComponent,
  ],
})
export class NGSuiteCoreModule {

  static injector: Injector;

  constructor(injector: Injector) {
    NGSuiteCoreModule.injector = injector;
  }

}
