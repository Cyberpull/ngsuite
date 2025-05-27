import { AfterViewInit, ChangeDetectorRef, Component, ComponentRef, HostBinding, inject, Inject, Injector, input, Input, ViewChild, ViewContainerRef } from "@angular/core";
import { NGS_CONFIG } from "../../../interfaces/Config";
import { NGSuiteLoadingAnimationComponent } from "../animation/animation.component";

@Component({
  selector: 'ngs-loading-page',
  templateUrl: 'page.component.html',
  styleUrls: ['page.component.scss'],
  standalone: true,
  imports: [],
})
export class NGSuiteLoadingPageComponent implements AfterViewInit {

  private readonly injector =  inject(Injector);
  private readonly cd =  inject(ChangeDetectorRef);
  private readonly config = inject(NGS_CONFIG);

  readonly showing = input(false);

  @HostBinding('class.visible')
  get visible() { return this.showing(); }

  private componentRef?: ComponentRef<any>;

  @ViewChild('container', {
    read: ViewContainerRef
  }) viewContainerRef?: ViewContainerRef;

  ngAfterViewInit() {
    const { viewContainerRef, config, cd } = this;

    if (viewContainerRef) {
      const animation = config.pageLoadingAnimation || config.loadingAnimation || NGSuiteLoadingAnimationComponent;

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
