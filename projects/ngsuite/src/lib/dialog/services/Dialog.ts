import { ApplicationRef, ComponentRef, createComponent, createEnvironmentInjector, inject, Injectable } from "@angular/core";
import { Registry } from "../../Registry";
import { NGSuiteComponent } from "../../core";
import { NGSuiteDialogConfig, NGSuiteDialogPopupOptions, NGSuiteDialogRoot } from "../interfaces";
import { NGSuiteDialogInstance } from "./DialogInstance";
import { NGSuiteDialogAlertComponent } from "../popup/alert/alert.component";
import { NGSuiteDialogConfirmComponent } from "../popup/confirm/confirm.component";
import { Observable, throwError } from "rxjs";
import { NGSuiteDialogRegistry } from "./DialogRegistry";

const DialogRootMap = new Map<NGSuiteDialog, NGSuiteDialogRoot>();

@Injectable({
  providedIn: 'root',
})
export class NGSuiteDialog {

  private readonly registry = inject(NGSuiteDialogRegistry);

  constructor() {
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

  private onEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();

      const instance = this.registry.active();

      instance?.send({
        name: 'esc.close',
        value: false
      });
    }
  }

  private onDocumentClick = (e: MouseEvent) => this.registry.focus();

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

    this.registry.add(instance);

    instance.afterClosed.subscribe(() => {
      this.registry.remove(instance);
    });

    return instance;
  }

  readonly closeAll = () => this.registry.closeAll();

  alert(title: string, message: string) {
    const data: NGSuiteDialogPopupOptions = { title, message };

    const dialog = this.open(NGSuiteDialogAlertComponent, {
      backdropClose: false,
      data
    });

    return dialog.afterClosed;
  }

  success(title: string, message: string) {
    message = `<div class="mbi-success">${message}</div>`;
    return this.alert(title, message);
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
