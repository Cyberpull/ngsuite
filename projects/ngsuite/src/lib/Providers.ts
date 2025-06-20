import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

import { NGS_CONFIG, NGSuiteConfig } from "./core/interfaces/Config";
import { Registry } from "./Registry";

export function provideNGSuite(config?: NGSuiteConfig) {
  config ||= {};

  return Registry.toEnvironmentProviders([
    { provide: NGS_CONFIG, useValue: config },
    provideHttpClient(withInterceptorsFromDi()),
  ]);
}
