import { ApplicationRef, ComponentRef, createComponent, createEnvironmentInjector, Injectable } from "@angular/core";
import { Registry } from "../../core/Registry";
import { NGSuiteComponent } from "../../core";
import { NGSuiteDialogConfig, NGSuiteDialogPopupOptions, NGSuiteDialogRoot } from "../interfaces";
import { NGSuiteDialogInstance } from "./DialogInstance";
import { NGSuiteDialogAlertComponent } from "../popup/alert/alert.component";
import { NGSuiteDialogConfirmComponent } from "../popup/confirm/confirm.component";
import { Observable, throwError } from "rxjs";

const DialogInstances: NGSuiteDialogInstance[] = [];
const DialogRootMap = new Map<NGSuiteDialog, NGSuiteDialogRoot>();

@Injectable()
export class NGSuiteDialog {

  constructor() {
    this.onEscape = this.onEscape.bind(this);
    this.onDocumentClick = this.onDocumentClick.bind(this);

    document.addEventListener('keydown', this.onEscape);
    document.addEventListener('click', this.onDocumentClick);
  }

  static attach(instance: NGSuiteDialog, root: NGSuiteDialogRoot) {
    if (DialogRootMap.has(instance)) return;
    DialogRootMap.set(instance, root);
  }

  static detach(instance: NGSuiteDialog) {
    DialogRootMap.delete(instance);
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

  open(component: NGSuiteComponent<any>, config?: NGSuiteDialogConfig):  NGSuiteDialogInstance {
    if(!config) config = null as any;

    const root = DialogRootMap.get(this);

    if (!root) throw new Error(
      '"ngs-dialog-root" component not found. ' +
      'Use "<ngs-root></ngs-root>" in your root component to enable all NGSuite features or ' +
      'add "<ngs-dialog-root></ngs-dialog-root>" to your root component to enable the NGSuiteDialog feature.'
    );

    const instance = new NGSuiteDialogInstance(
      root.viewContainerRef,
      component,
      root.injector,
      config
    );

    DialogInstances.push(instance);

    instance.afterClosed.subscribe(() => {
      const index = DialogInstances.indexOf(instance);
      DialogInstances.splice(index, 1);
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
      data
    });

    return dialog.afterClosed;
  }

  error(title: string, message: string) {
    message = `<div class="mbi-error">${message}</div>`;
    return this.alert(title, message);
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
