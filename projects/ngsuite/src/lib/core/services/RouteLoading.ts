import { Injectable } from "@angular/core";
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { filter } from "rxjs/operators";
import { NGSuiteLoading } from "./Loading";
import { Registry } from "../Registry";

@Injectable()
export class NGSuiteRouteLoading {

  private xLoadingSubs: Subscription[] = [];

  constructor(
    private router: Router,
    private loading: NGSuiteLoading
  ) {  }

  init() {
    const { router, loading, xLoadingSubs } = this;

    if (xLoadingSubs.length) return;

    const navStart = filter(nav => nav instanceof NavigationStart);
    xLoadingSubs.push(router.events.pipe(navStart).subscribe(nav => {
      loading.start();
    }));

    const navEnd = filter(nav => nav instanceof NavigationEnd);
    xLoadingSubs.push(router.events.pipe(navEnd).subscribe(nav => {
      loading.stop();
    }));

    const navCancel = filter(nav => nav instanceof NavigationCancel);
    xLoadingSubs.push(router.events.pipe(navCancel).subscribe(nav => {
      loading.stop();
    }));

    const navError = filter(nav => nav instanceof NavigationError);
    xLoadingSubs.push(router.events.pipe(navError).subscribe(nav => {
      loading.stop();
    }));
  }

  destroy() {
    const { xLoadingSubs } = this;

    while (xLoadingSubs.length) {
      const xSub = xLoadingSubs.shift();
      xSub?.unsubscribe();
    }
  }

}

Registry.add(NGSuiteRouteLoading);
