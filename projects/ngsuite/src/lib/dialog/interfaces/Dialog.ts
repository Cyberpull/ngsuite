import { InjectionToken, Injector, ViewContainerRef } from "@angular/core";

export const NGS_DIALOG_CONTENT = 'ngs-dialog-content';

export const NGS_DIALOG_CONFIG = 'ngs-dialog-config';

export const NGS_DIALOG_DATA = new InjectionToken<any>('ngs-dialog-data');

export function NGS_DIALOG_TOKEN<T = any>(): InjectionToken<T> {
  return NGS_DIALOG_DATA;
}

export interface NGSuiteDialogConfig<T = any> {
  closeOnEsc?: boolean;
  backdropClose?: boolean;
  closeBtn?: boolean;
  data?: T
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
