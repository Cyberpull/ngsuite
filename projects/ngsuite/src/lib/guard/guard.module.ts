import { Injector, NgModule } from "@angular/core";
import { NGSuiteCoreModule } from "../core/core.module";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,

    NGSuiteCoreModule,
  ],

  exports: [],

  declarations: [],
})
export class NGSuiteGuardModule { }
