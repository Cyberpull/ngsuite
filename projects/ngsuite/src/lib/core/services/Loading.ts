import { ApplicationRef, ComponentRef, createComponent, createEnvironmentInjector, Injectable } from "@angular/core";
import { NGSuiteLoadingRootComponent } from "../components";
import { Registry } from "../Registry";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class NGSuiteLoading {

  readonly text: Observable<string>;
  readonly showing: Observable<boolean>;
  readonly count: Observable<number>;

  private xText: BehaviorSubject<string>;
  private xShowing: BehaviorSubject<boolean>;
  private xCount: BehaviorSubject<number>;

  constructor() {
    this.xText = new BehaviorSubject('');
    this.text = this.xText.asObservable();

    this.xShowing = new BehaviorSubject(false);
    this.showing = this.xShowing.asObservable();

    this.xCount = new BehaviorSubject(0);
    this.count = this.xCount.asObservable();
  }

  start(text: string = '') {
    const { xText, xCount, xShowing } = this;

    const count = xCount.value + 1;
    const showing = count > 0;

    xText.next(text);
    xCount.next(count);

    if (showing !== xShowing.value) {
      xShowing.next(showing);
    }
  }

  stop() {
    const { xText, xCount, xShowing } = this;

    const count = Math.max(xCount.value - 1, 0);
    const showing = count > 0;

    if (!showing) xText.next('');
    xCount.next(count);

    if (showing !== xShowing.value) {
      xShowing.next(showing);
    }
  }

}

Registry.add(NGSuiteLoading);
