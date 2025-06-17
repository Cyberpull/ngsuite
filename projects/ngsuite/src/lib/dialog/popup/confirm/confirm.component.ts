import { Component, inject } from "@angular/core";

import { NGSuiteDialogRef } from "../../services";
import { NGS_DIALOG_DATA } from "../../interfaces";
import { NGSuiteFormButtonComponent } from "../../../form";

import {
  NGSuiteDialogBodyComponent,
  NGSuiteDialogFooterComponent,
  NGSuiteDialogHeaderComponent,
} from "../../components";
import { NGS_CONFIG } from "../../../core";

@Component({
  selector: 'ngs-dialog-confirm',
  templateUrl: 'confirm.component.html',
  styleUrls: ['confirm.component.scss'],
  standalone: true,
  imports: [
    NGSuiteDialogHeaderComponent,
    NGSuiteDialogBodyComponent,
    NGSuiteDialogFooterComponent,
    NGSuiteFormButtonComponent,
  ],
})
export class NGSuiteDialogConfirmComponent {

  private readonly dialogRef = inject(NGSuiteDialogRef<NGSuiteDialogConfirmComponent>);
  private readonly data = inject(NGS_DIALOG_DATA);
  private readonly config = inject(NGS_CONFIG);

  readonly defaultBtnTheme = this.config.defaultAlertButtonTheme || 'primary';

  get title() { return this.data.title; }
  get message() { return this.data.message; }

  accept() {
    const { dialogRef } = this;
    dialogRef.close(true);
  }

  reject() {
    const { dialogRef } = this;
    dialogRef.close(false);
  }

}
