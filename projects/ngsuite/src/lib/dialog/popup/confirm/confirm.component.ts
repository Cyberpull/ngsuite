import { Component, Inject } from "@angular/core";

import { NGSuiteDialogRef } from "../../services";
import { NGSuiteDialogPopupOptions, NGS_DIALOG_DATA } from "../../interfaces";
import { NGSuiteFormButtonComponent } from "../../../form";

import {
  NGSuiteDialogBodyComponent,
  NGSuiteDialogFooterComponent,
  NGSuiteDialogHeaderComponent,
} from "../../components";

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

  get title() { return this.data.title; }
  get message() { return this.data.message; }

  constructor(
    private dialogRef: NGSuiteDialogRef<NGSuiteDialogConfirmComponent>,
    @Inject(NGS_DIALOG_DATA) private data: NGSuiteDialogPopupOptions
  ) {  }

  accept() {
    const { dialogRef } = this;
    dialogRef.close(true);
  }

  reject() {
    const { dialogRef } = this;
    dialogRef.close(false);
  }

}
