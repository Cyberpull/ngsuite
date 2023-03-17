import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { SerialGuardFn } from "../functions";
import { GuardConstructor, GuardDecorator, SerialGuardInfo } from "../interfaces";

export function SerialGuard(info: SerialGuardInfo): GuardDecorator {
  return function<T extends GuardConstructor> (guard: T) {
    @Injectable()
    class _SerialGuard extends guard implements CanActivate, CanActivateChild {

      readonly info: SerialGuardInfo = info;

      readonly canActivate = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> => {
        return this.canActivateChild(route, state);
      }

      readonly canActivateChild = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> => {
        const fn = SerialGuardFn(this.info);
        return fn(route, state);
      }

    }

    return _SerialGuard;
  }
}
