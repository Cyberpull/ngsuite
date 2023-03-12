import { Injector, NgModule } from "@angular/core";
import { CyberpullCoreModule } from "../core/core.module";

@NgModule({
  imports: [
    CyberpullCoreModule,
  ],

  exports: [
    CyberpullCoreModule,
  ],

  declarations: [],
})
export class CyberpullGuardModule {

  static injector: Injector;

  constructor(injector: Injector) {
    CyberpullGuardModule.injector = injector;
  }

}
