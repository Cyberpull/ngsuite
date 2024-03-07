import { Component, OnDestroy } from "@angular/core";
import { NGSuiteLoading } from "../../../services";
import { Subscription } from "rxjs";

@Component({
  selector: 'ngs-loading-root',
  templateUrl: 'root.component.html',
  styleUrls: ['root.component.scss']
})
export class NGSuiteLoadingRootComponent implements OnDestroy {

  get text() { return this.xText; }
  get showing() { return this.xShowing; }
  get counter() { return this.xCounter; }

  private xText: string = '';
  private xShowing: boolean = false;
  private xCounter: number = 0;

  private xTextSub: Subscription;
  private xShowingSub: Subscription;
  private xCounterSub: Subscription;

  constructor(
    private loading: NGSuiteLoading
  ) {
    this.xTextSub = loading.text.subscribe(value => this.xText = value);
    this.xShowingSub = loading.showing.subscribe(value => this.xShowing = value);
    this.xCounterSub = loading.count.subscribe(value => this.xCounter = value);
  }

  ngOnDestroy(): void {
    this.xTextSub.unsubscribe();
    this.xShowingSub.unsubscribe();
    this.xCounterSub.unsubscribe();
  }

}
