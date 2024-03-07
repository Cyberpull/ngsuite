import { ApplicationRef, ComponentRef, createComponent, createEnvironmentInjector, Injectable } from "@angular/core";
import { Registry } from "../../core/Registry";
import { NGSuiteComponent } from "../../core";
import { NGSuiteDialogRootComponent } from "../components/root/root.component";
import { NGSuiteDialogConfig, NGSuiteDialogPopupOptions } from "../interfaces/Dialog";
import { NGSuiteDialogInstance } from "./DialogInstance";
import { NGSuiteDialogAlertComponent } from "../popup/alert/alert.component";
import { NGSuiteDialogConfirmComponent } from "../popup/confirm/confirm.component";
import { Observable } from "rxjs";

const DialogInstances: NGSuiteDialogInstance[] = [];

@Injectable()
export class NGSuiteDialog {

  private componentRef: ComponentRef<NGSuiteDialogRootComponent>;

  constructor(
    private appRef: ApplicationRef
  ) {
    const injector = createEnvironmentInjector([], appRef.injector);

    this.componentRef = createComponent(NGSuiteDialogRootComponent, {
      environmentInjector: injector
    });

    appRef.attachView(this.componentRef.hostView);

    const { location } = this.componentRef;
    document.body.appendChild(location.nativeElement);

    this.onEscape = this.onEscape.bind(this);
    this.onDocumentClick = this.onDocumentClick.bind(this);

    document.addEventListener('keydown', this.onEscape);
    document.addEventListener('click', this.onDocumentClick);
  }

  private onEscape(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      e.preventDefault();

      if (!DialogInstances.length) return;

      const instance = DialogInstances[DialogInstances.length - 1];

      instance.send({
        name: 'esc.close',
        value: false
      });
    }
  }

  private onDocumentClick(e: MouseEvent) {
    if (!DialogInstances.length) return;
    const instance = DialogInstances[DialogInstances.length - 1];
    instance.focus();
  }

  open(component: NGSuiteComponent<any>, config?: NGSuiteDialogConfig) {
    if(!config) config = null as any;

    const { componentRef } = this;
    const { instance: parent } = componentRef;

    const instance = new NGSuiteDialogInstance(
      parent.viewContainerRef,
      component,
      componentRef.injector,
      config
    );

    DialogInstances.push(instance);

    instance.afterClosed.subscribe(() => {
      const index = DialogInstances.indexOf(instance);
      DialogInstances.splice(index);
    });

    return instance;
  }

  closeAll() {
    while (DialogInstances.length) {
      const instance = DialogInstances.pop() as NGSuiteDialogInstance;
      instance.close(false);
    }
  }

  alert(title: string, message: string) {
    const data: NGSuiteDialogPopupOptions = { title, message };

    const dialog = this.open(NGSuiteDialogAlertComponent, {
      backdropClose: false,
      closeOnEsc: false,
      data
    });

    return dialog.afterClosed;
  }

  error(title: string, message: string) {
    const data: NGSuiteDialogPopupOptions = { title, message };

    const dialog = this.open(NGSuiteDialogAlertComponent, {
      backdropClose: false,
      closeOnEsc: false,
      data
    });

    return dialog.afterClosed;
  }

  confirm(title: string, message: string): Observable<boolean> {
    const data: NGSuiteDialogPopupOptions = { title, message };

    const dialog = this.open(NGSuiteDialogConfirmComponent, {
      backdropClose: false,
      closeOnEsc: false,
      data
    });

    return dialog.afterClosed;
  }

}

Registry.add(NGSuiteDialog);
