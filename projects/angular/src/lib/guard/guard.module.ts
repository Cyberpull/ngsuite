import { Injector, NgModule } from "@angular/core";
import { NGSuiteCoreModule } from "../core/core.module";

@NgModule({
  imports: [
    NGSuiteCoreModule,
  ],

  exports: [
    NGSuiteCoreModule,
  ],

  declarations: [],
})
export class NGSuiteGuardModule { }
