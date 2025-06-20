import { effect, inject, Injectable, OnDestroy } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateChildFn, NavigationStart, Router, RouterStateSnapshot } from "@angular/router";
import { Registry } from "../../Registry";
import { NGSuiteComponent } from "../../core";
import { NGSuiteDialogConfig, NGSuiteDialogPopupOptions, NGSuiteDialogRoot } from "../interfaces";
import { NGSuiteDialogInstance } from "./DialogInstance";
import { NGSuiteDialogAlertComponent } from "../popup/alert/alert.component";
import { NGSuiteDialogConfirmComponent } from "../popup/confirm/confirm.component";
import { filter, Observable, throwError } from "rxjs";
import { NGSuiteDialogRegistry } from "./DialogRegistry";
import { toSignal } from "@angular/core/rxjs-interop";

const DialogRootMap = new Map<NGSuiteDialog, NGSuiteDialogRoot>();

@Injectable({
  providedIn: 'root',
})
export class NGSuiteDialog implements OnDestroy {

  private readonly router = inject(Router);
  private readonly registry = inject(NGSuiteDialogRegistry);

  private readonly nav = toSignal(this.router.events.pipe(
    filter(e => e instanceof NavigationStart)
  ), { initialValue: null });

  constructor() {
    document.addEventListener('click', this.onDocumentClick);
    document.addEventListener('keydown', this.onDocumentKeyDown);
  }

  ngOnDestroy() {
    const { router, registry } = this;

    document.removeEventListener('click', this.onDocumentClick);
    document.removeEventListener('keydown', this.onDocumentKeyDown);

    effect(() => {
      const nav = this.nav();
      if (!nav) return;

      const active = registry.active();
      if (!active) return;

      const canClose = active.config?.closeOnBackBtn ?? true;
      if (canClose) active.close(false);

      router.navigateByUrl(router.url, { replaceUrl: true });
    });
  }

  private readonly onDocumentClick = () => this.registry.focus();

  private readonly onDocumentKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'Escape': {
        e.preventDefault();

        const instance = this.registry.active();

        instance?.send({
          name: 'esc.close',
          value: false
        });
      } break;
    }
  }

  static attach(instance: NGSuiteDialog, root: NGSuiteDialogRoot) {
    if (DialogRootMap.has(instance)) return;
    DialogRootMap.set(instance, root);
  }

  static detach(instance: NGSuiteDialog) {
    DialogRootMap.delete(instance);
  }

  open(component: NGSuiteComponent<any>, config?: NGSuiteDialogConfig):  NGSuiteDialogInstance {
    if(!config) config = null as any;

    const root = DialogRootMap.get(this);

    if (!root) throw new Error(
      '"ngs-dialog-root" component not found. ' +
      'Use "<ngs-root></ngs-root>" in your root component to enable all NGSuite features or ' +
      'add "<ngs-dialog-root></ngs-dialog-root>" to your root component to enable the NGSuiteDialog feature.'
    );

    const onClosed = (ins: NGSuiteDialogInstance) => {
      this.registry.remove(ins);
    }

    const instance = new NGSuiteDialogInstance(
      root.viewContainerRef,
      component,
      root.injector,
      onClosed,
      config
    );

    this.registry.add(instance);

    return instance;
  }

  readonly closeAll = () => this.registry.closeAll();

  alert(title: string, message: string) {
    const data: NGSuiteDialogPopupOptions = { title, message };

    const dialog = this.open(NGSuiteDialogAlertComponent, {
      closeOnBackBtn: false,
      backdropClose: false,
      closeOnEsc: false,
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
      closeOnBackBtn: false,
      backdropClose: false,
      closeOnEsc: false,
      data
    });

    return dialog.afterClosed;
  }

  // =========================

  /** @deprecated */
  static readonly guard = (): CanActivateChildFn => (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return true;

    // const { registry } = inject(NGSuiteDialog);

    // const active = registry.active();
    // if (!active) return true;

    // const canClose = active.config?.closeOnBackBtn ?? true;
    // if (canClose) active.close(false);

    // return false;
  }

}

Registry.add(NGSuiteDialog);
