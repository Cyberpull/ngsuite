import { NgModule, ModuleWithProviders } from "@angular/core";

import { Registry } from './core/Registry';

import { CyberpullCoreModule, CyberpullConfig } from './core';
import { CyberpullDialogModule } from './dialog';
import { CyberpullGuardModule } from './guard';

@NgModule({
  imports: [
    CyberpullCoreModule,
    CyberpullDialogModule,
    CyberpullGuardModule,
  ],

  exports: [
    CyberpullCoreModule,
    CyberpullDialogModule,
    CyberpullGuardModule,
  ],
})
export class CyberpullModule {

  static forRoot(config: CyberpullConfig): ModuleWithProviders<any> {
    return {
      ngModule: CyberpullModule,
      providers: Registry.entries([
        { provide: 'Cyberpull', useValue: config }
      ])
    };
  }

}
