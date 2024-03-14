import { CommonModule } from "@angular/common";
import { Injector, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

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
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],

  exports: [
    NGSuiteIconComponent,

    NGSuitePanelComponent,
    NGSuitePanelBodyComponent,
    NGSuitePanelFooterComponent,
    NGSuitePanelHeaderComponent,

    NGSuiteContainerComponent,

    NGSuiteLoadingSectionComponent,
    NGSuiteLoadingRootComponent,

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
