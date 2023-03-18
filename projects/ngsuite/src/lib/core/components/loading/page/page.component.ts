import { AfterViewInit, ChangeDetectorRef, Component, ComponentRef, Inject, Injector, ViewChild, ViewContainerRef } from "@angular/core";
import { NGSuiteConfig } from "../../../interfaces";
import { NGSuiteLoadingAnimationComponent } from "../animation/animation.component";

@Component({
  selector: 'ngs-loading-page',
  templateUrl: 'page.component.html',
  styleUrls: ['page.component.scss']
})
export class NGSuiteLoadingPageComponent implements AfterViewInit {

  private componentRef?: ComponentRef<any>;

  @ViewChild('container', {
    read: ViewContainerRef
  }) viewContainerRef?: ViewContainerRef;

  constructor(
    private injector: Injector,
    private cd: ChangeDetectorRef,
    @Inject('NGSuite') private config: NGSuiteConfig
  ) {  }

  ngAfterViewInit() {
    const { viewContainerRef, config, cd } = this;

    if (viewContainerRef) {
      const animation = config.pageLoadingAnimation || NGSuiteLoadingAnimationComponent;

      const newInjector = Injector.create({
        parent: this.injector,
        providers: []
      });

      this.componentRef = viewContainerRef.createComponent(animation, {
        injector: newInjector,
        index: undefined
      });
    }

    cd.detectChanges();
  }

}
