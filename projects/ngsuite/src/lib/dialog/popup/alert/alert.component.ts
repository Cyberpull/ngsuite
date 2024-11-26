import { Component, Inject } from "@angular/core";

import { NGSuiteDialogPopupOptions, NGS_DIALOG_DATA } from "../../interfaces";
import { NGSuiteDialogRef } from "../../services";
import { NGSuiteFormButtonComponent } from "../../../form";

import {
  NGSuiteDialogBodyComponent,
  NGSuiteDialogFooterComponent,
  NGSuiteDialogHeaderComponent,
} from "../../components";


@Component({
  selector: 'ngs-dialog-alert',
  templateUrl: 'alert.component.html',
  styleUrls: ['alert.component.scss'],
  standalone: true,
  imports: [
    NGSuiteDialogHeaderComponent,
    NGSuiteDialogBodyComponent,
    NGSuiteDialogFooterComponent,
    NGSuiteFormButtonComponent,
  ],
})
export class NGSuiteDialogAlertComponent {

  get title() { return this.data.title; }
  get message() { return this.data.message; }

  constructor(
    private dialogRef: NGSuiteDialogRef<NGSuiteDialogAlertComponent>,
    @Inject(NGS_DIALOG_DATA) private data: NGSuiteDialogPopupOptions
  ) {  }

  accept() {
    const { dialogRef } = this;
    dialogRef.close(true);
  }

}
