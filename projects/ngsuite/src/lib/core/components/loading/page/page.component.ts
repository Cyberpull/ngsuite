import { AfterViewInit, ChangeDetectorRef, Component, ComponentRef, Inject, Injector, Input, ViewChild, ViewContainerRef } from "@angular/core";
import { NGS_LOADING_READER, NGSuiteConfig } from "../../../interfaces";
import { NGSuiteLoadingAnimationComponent } from "../animation/animation.component";
import { LoadingReader, LoadingWriter } from "../../../services";

@Component({
  selector: 'ngs-loading-page',
  templateUrl: 'page.component.html',
  styleUrls: ['page.component.scss']
})
export class NGSuiteLoadingPageComponent implements AfterViewInit {

  private componentRef?: ComponentRef<any>;

  private writer: LoadingWriter;

  @Input('text') set text(value: string) { this.writer.text.next(value); }
  get text() { return this.writer.text.value; }

  @Input('counter') set counter(value: number) { this.writer.counter.next(value); }
  get counter() { return this.writer.counter.value; }

  @ViewChild('container', {
    read: ViewContainerRef
  }) viewContainerRef?: ViewContainerRef;

  constructor(
    private injector: Injector,
    private cd: ChangeDetectorRef,
    @Inject('NGSuite') private config: NGSuiteConfig
  ) {
    this.writer = new LoadingWriter();
  }

  ngAfterViewInit() {
    const { writer, viewContainerRef, config, cd } = this;

    if (viewContainerRef) {
      const animation = config.pageLoadingAnimation || config.loadingAnimation || NGSuiteLoadingAnimationComponent;

      const newInjector = Injector.create({
        parent: this.injector,
        providers: [
          { provide: NGS_LOADING_READER, useValue: new LoadingReader(writer) }
        ]
      });

      this.componentRef = viewContainerRef.createComponent(animation, {
        injector: newInjector,
        index: undefined
      });
    }

    cd.detectChanges();
  }

}
