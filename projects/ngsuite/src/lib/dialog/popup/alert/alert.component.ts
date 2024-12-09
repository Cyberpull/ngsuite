import { Component, inject } from "@angular/core";

import { NGS_DIALOG_DATA } from "../../interfaces";
import { NGSuiteDialogRef } from "../../services";
import { NGSuiteFormButtonComponent } from "../../../form";

import {
  NGSuiteDialogBodyComponent,
  NGSuiteDialogFooterComponent,
  NGSuiteDialogHeaderComponent,
} from "../../components";

import { NGSuiteDialogConfirmComponent } from "../confirm/confirm.component";


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

  private readonly dialogRef = inject(NGSuiteDialogRef<NGSuiteDialogConfirmComponent>);
  private readonly data = inject(NGS_DIALOG_DATA);

  get title() { return this.data.title; }
  get message() { return this.data.message; }

  accept() {
    const { dialogRef } = this;
    dialogRef.close(true);
  }

}
