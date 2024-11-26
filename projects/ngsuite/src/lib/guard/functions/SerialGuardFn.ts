import { Injector, StaticProvider } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, RouterStateSnapshot, UrlTree } from "@angular/router";
import { from, Observable, of, switchMap } from "rxjs";
import { GuardEntry, SerialGuardInfo } from "../interfaces";
import { GuardDataService } from "../services";

export function SerialGuardFn(info: SerialGuardInfo): CanActivateFn | CanActivateChildFn {
  const providers: StaticProvider[] = [];

  if (info.providers) providers.push(...info.providers as unknown as StaticProvider[]);
  providers.push(...info.entries as unknown as StaticProvider[]);

  return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
    const data = new GuardDataService();

    const injector = Injector.create({
      // parent: NGSuiteCoreModule.injector,
      providers,
    });

    let result: boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>;

    result = of(true);

    for (const entry of info.entries) {
      result = result.pipe(
        switchMap(resp => {
          if (resp === true) {
            const xGuard: GuardEntry = injector.get(entry);
            const output = xGuard.invoke(route, state, data);

            if (output instanceof Observable) return output;
            if (output instanceof Promise) return from(output);

            return of(output);
          }

          return of(resp);
        })
      );
    }

    return result;
  }
}
