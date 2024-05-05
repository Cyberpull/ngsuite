import { InjectionToken, Injector, ViewContainerRef } from "@angular/core";
import { NGSuiteComponent } from "../../core/interfaces/Component";

export const NGS_DIALOG_CONTENT = new InjectionToken<NGSuiteComponent>('ngs-dialog-content');

export const NGS_DIALOG_CONFIG = new InjectionToken<NGSuiteDialogConfig>('ngs-dialog-config');

export const NGS_DIALOG_DATA = new InjectionToken<any>('ngs-dialog-data');

export function NGS_DIALOG_TOKEN<T = any>(): InjectionToken<T> {
  return NGS_DIALOG_DATA;
}

export interface NGSuiteDialogConfig {
  closeOnEsc?: boolean;
  backdropClose?: boolean;
  closeBtn?: boolean;
  data?: any
}

export interface NGSuiteDialogCommand<T = any> {
  name: string;
  value?: T;
}

export interface NGSuiteDialogPopupOptions {
  title: string;
  message: string;
}

export interface NGSuiteDialogRoot {
  viewContainerRef: ViewContainerRef;
  injector: Injector;
}
