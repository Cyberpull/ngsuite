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
export class CyberpullDialogModule {

  static injector: Injector;

  constructor(injector: Injector) {
    CyberpullDialogModule.injector = injector;
  }

}
