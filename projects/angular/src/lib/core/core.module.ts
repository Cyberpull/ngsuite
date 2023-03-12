import { Injector, NgModule } from "@angular/core";

@NgModule({
  imports: [],

  exports: [],

  declarations: [],
})
export class CyberpullCoreModule {

  static injector: Injector;

  constructor(injector: Injector) {
    CyberpullCoreModule.injector = injector;
  }

}
