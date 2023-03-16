
export const NGS_DIALOG_CONTENT = 'ngs-dialog-content';
export const NGS_DIALOG_CONFIG = 'ngs-dialog-config';
export const NGS_DIALOG_DATA = 'ngs-dialog-data';

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
