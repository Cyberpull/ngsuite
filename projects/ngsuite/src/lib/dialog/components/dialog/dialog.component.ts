import { AfterViewInit, ChangeDetectorRef, Component, ComponentRef, ElementRef, EmbeddedViewRef, Inject, Injector, OnDestroy, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { NGSuiteComponent } from "../../../core";
import { NGSuiteDialogConfig, NGS_DIALOG_CONFIG, NGS_DIALOG_CONTENT, NGS_DIALOG_DATA } from "../../interfaces/Dialog";
import { NGSuiteDialogRef } from "../../services/DialogRef";

@Component({
  selector: 'ngs-dialog',
  templateUrl: 'dialog.component.html',
  styleUrls: ['dialog.component.scss']
})
export class NGSuiteDialogComponent implements AfterViewInit, OnDestroy {

  @ViewChild('container', {
    read: ViewContainerRef
  }) viewContainerRef: ViewContainerRef = null as any;

  private componentRef: ComponentRef<any> = null as any;

  constructor(
    private injector: Injector,
    private cd: ChangeDetectorRef,
    private xDialogRef: NGSuiteDialogRef<any>,
    @Inject(NGS_DIALOG_CONTENT) private content: NGSuiteComponent<any>,
    @Inject(NGS_DIALOG_CONFIG) private config: NGSuiteDialogConfig,
    private el: ElementRef<HTMLElement>,
  ) {
    this.onBackdropClick = this.onBackdropClick.bind(this);

    const { nativeElement } = el;
    nativeElement.addEventListener('click', this.onBackdropClick);
  }

  ngAfterViewInit() {
    const { cd, viewContainerRef, injector, content, config } = this;

    const newInjector = Injector.create({
      parent: injector,
      providers: [
        { provide: NGSuiteDialogRef, useValue: this.xDialogRef },
        { provide: NGS_DIALOG_DATA, useValue: config?.data || null },
        { provide: NGS_DIALOG_CONFIG, useValue: config }
      ]
    });

    this.componentRef = viewContainerRef.createComponent(content, {
      injector: newInjector
    });

    const { nativeElement } = this.componentRef.location as ElementRef<HTMLElement>;

    nativeElement.tabIndex = -1;
    nativeElement.classList.add('ngs-dialog-box');
    nativeElement.focus();

    nativeElement.addEventListener('click', e => {
      e.stopPropagation();
    });

    cd.detectChanges();
  }

  ngOnDestroy() {
    const { nativeElement } = this.el;
    nativeElement.removeEventListener('click', this.onBackdropClick);

    // document.removeEventListener('keydown', this.onEscape);
  }

  onBackdropClick(e: MouseEvent) {
    const { xDialogRef, config } = this;

    this.focus();

    if (config?.backdropClose !== false) {
      xDialogRef.close(false);
    }
  }

  focus() {
    const { nativeElement } = this.componentRef.location as ElementRef<HTMLElement>;
    nativeElement.focus();
  }

}
