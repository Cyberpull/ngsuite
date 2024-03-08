import { AfterViewInit, ChangeDetectorRef, Component, ComponentRef, ElementRef, Inject, Injector, Input, ViewChild, ViewContainerRef } from "@angular/core";
import { NGSuiteConfig } from "../../../interfaces";
import { NGSuiteLoadingAnimationComponent } from "../animation/animation.component";

@Component({
  selector: 'ngs-loading-section',
  templateUrl: 'section.component.html',
  styleUrls: ['section.component.scss']
})
export class NGSuiteLoadingSectionComponent implements AfterViewInit {

  private componentRef?: ComponentRef<any>;

  @ViewChild('container', {
    read: ViewContainerRef
  }) viewContainerRef?: ViewContainerRef;

  @Input() loading: boolean = false;

  constructor(
    private injector: Injector,
    private cd: ChangeDetectorRef,
    @Inject('NGSuite') private config: NGSuiteConfig
  ) {  }

  ngAfterViewInit() {
    const { viewContainerRef, config, cd } = this;

    if (viewContainerRef) {
      const animation = config.sectionLoadingAnimation || config.loadingAnimation || NGSuiteLoadingAnimationComponent;

      const newInjector = Injector.create({
        parent: this.injector,
        providers: []
      });

      this.componentRef = viewContainerRef.createComponent(animation, {
        injector: newInjector,
        index: undefined
      });

      const { componentRef: { location } } = this;
      const $element = location.nativeElement as HTMLElement;

      $element.setAttribute('data-ngs-loading', 'section');
      $element.classList.add('ngs-loading-section');
    }

    cd.detectChanges();
  }

}
