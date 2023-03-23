import { StaticProvider } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

export type GuardConstructor = new (...args: any[]) => {};

export interface GuardDecorator {
  <T extends GuardConstructor>(type: T): T
}

export interface Chain<T extends GuardEntry> {
  new (...args: any[]): T;
}

export interface GuardDataInterface {
  has(key: string): boolean;

  set(key: string, value: any): void;

  get<T = any>(key: string): T;
}

export interface GuardEntry {
  invoke(route: ActivatedRouteSnapshot, state: RouterStateSnapshot, data: GuardDataInterface): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>;
}

export interface SerialGuardInfo {
  providers?: StaticProvider[];
  entries: Chain<GuardEntry>[];
}
