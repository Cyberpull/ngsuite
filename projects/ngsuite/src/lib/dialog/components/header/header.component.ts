import { Component, Injector, Inject, Input } from "@angular/core";
import { NGSuiteDialogConfig, NGS_DIALOG_CONFIG } from "../../interfaces";
import { NGSuiteDialogRef } from "../../services/DialogRef";

@Component({
  selector: 'ngs-dialog-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})
export class NGSuiteDialogHeaderComponent {

  @Input() icon: string = '';

  closeBtn: boolean = true;

  private xDialogRef: NGSuiteDialogRef<any>;

  constructor(
    private injector: Injector,
    @Inject(NGS_DIALOG_CONFIG) private config: NGSuiteDialogConfig,
  ) {
    this.xDialogRef = injector.get(NGSuiteDialogRef);
    this.closeBtn = config.closeBtn !== false;
  }

  close(e: Event) {
    e.preventDefault();

    const { xDialogRef } = this;

    if (xDialogRef) {
      xDialogRef.close(false);
    }
  }

}
