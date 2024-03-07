import { AfterViewInit, ChangeDetectorRef, Component, ComponentRef, Inject, Injector, Input, ViewChild, ViewContainerRef } from "@angular/core";
import { NGSuiteConfig } from "../../../interfaces";
import { NGSuiteLoadingAnimationComponent } from "../animation/animation.component";
import { LoadingReader, LoadingWriter } from "../../../services";

@Component({
  selector: 'ngs-loading-section',
  templateUrl: 'section.component.html',
  styleUrls: ['section.component.scss']
})
export class NGSuiteLoadingSectionComponent implements AfterViewInit {

  private componentRef?: ComponentRef<any>;

  private writer: LoadingWriter;

  @ViewChild('container', {
    read: ViewContainerRef
  }) viewContainerRef?: ViewContainerRef;

  @Input() loading: boolean = false;

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
      const animation = config.sectionLoadingAnimation || config.loadingAnimation || NGSuiteLoadingAnimationComponent;

      const newInjector = Injector.create({
        parent: this.injector,
        providers: [
          { provide: LoadingReader, useValue: new LoadingReader(writer) }
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
