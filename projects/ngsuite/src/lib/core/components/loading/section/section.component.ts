import { AfterViewInit, ChangeDetectorRef, Component, ComponentRef, ElementRef, inject, Injector, Input, ViewChild, ViewContainerRef } from "@angular/core";
import { NGS_CONFIG } from "../../../interfaces/Config";
import { NGSuiteLoadingAnimationComponent } from "../animation/animation.component";
import { NgClass } from "@angular/common";

@Component({
  selector: 'ngs-loading-section',
  templateUrl: 'section.component.html',
  styleUrls: ['section.component.scss'],
  standalone: true,
  imports: [
    NgClass,
  ],
})
export class NGSuiteLoadingSectionComponent implements AfterViewInit {

  private readonly injector =  inject(Injector);
  private readonly cd =  inject(ChangeDetectorRef);
  private readonly config = inject(NGS_CONFIG);

  private componentRef?: ComponentRef<any>;

  @ViewChild('container', {
    read: ViewContainerRef
  }) viewContainerRef?: ViewContainerRef;

  @Input() loading: boolean = false;

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
