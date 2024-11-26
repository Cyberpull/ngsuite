import { ChangeDetectorRef, Component, OnDestroy, inject } from "@angular/core";
import { NGSuiteLoading } from "../../../services";
import { Subscription } from "rxjs";
import { NGSuiteLoadingPageComponent } from "../page/page.component";

@Component({
  selector: 'ngs-loading-root',
  templateUrl: 'root.component.html',
  styleUrls: ['root.component.scss'],
  standalone: true,
  imports: [
    NGSuiteLoadingPageComponent,
  ],
})
export class NGSuiteLoadingRootComponent implements OnDestroy {

  private readonly cd = inject(ChangeDetectorRef);
  private readonly loading = inject(NGSuiteLoading);

  get text() { return this.xText; }
  get showing() { return this.xShowing; }
  get counter() { return this.xCounter; }

  private xText: string = '';
  private xShowing: boolean = false;
  private xCounter: number = 0;

  private xTextSub: Subscription;
  private xShowingSub: Subscription;
  private xCounterSub: Subscription;

  constructor() {
    const { loading } = this;

    this.xTextSub = loading.text.subscribe(this.onTextChange);
    this.xShowingSub = loading.showing.subscribe(this.onShowingChange);
    this.xCounterSub = loading.count.subscribe(this.onCountChange);
  }

  ngOnDestroy(): void {
    this.xTextSub.unsubscribe();
    this.xShowingSub.unsubscribe();
    this.xCounterSub.unsubscribe();
  }

  private onTextChange = (value: string) => {
    const { cd } = this;
    this.xText = value;
    cd.markForCheck();
  }

  private onShowingChange = (value: boolean) => {
    const { cd } = this;
    this.xShowing = value;
    cd.markForCheck();
  }

  private onCountChange = (value: number) => {
    const { cd } = this;
    this.xCounter = value;
    cd.markForCheck();
  }

}
