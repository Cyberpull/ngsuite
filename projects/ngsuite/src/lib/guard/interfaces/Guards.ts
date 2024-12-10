import { Provider, StaticProvider } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

export type GuardConstructor = new (...args: any[]) => {};

export type GuardDecorator = {
  <T extends GuardConstructor>(type: T): T
}

export type Chain<T extends GuardEntry> = {
  new (...args: any[]): T;
}

export type GuardDataInterface = {
  has(key: string): boolean;

  set(key: string, value: any): void;

  get<T = any>(key: string): T;
}

export type GuardEntry = {
  invoke(route: ActivatedRouteSnapshot, state: RouterStateSnapshot, data: GuardDataInterface): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>;
}

export type GuardProvider = Provider | StaticProvider;

export type SerialGuardInfo = {
  providers?: GuardProvider[];
  entries: Chain<GuardEntry>[];
}
