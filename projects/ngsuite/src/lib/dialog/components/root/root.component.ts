import { Component, Injector, ViewChild, ViewContainerRef } from "@angular/core";
import { NGSuiteDialogRoot } from "../../interfaces";
import { NGSuiteDialog } from "../../services";

@Component({
  selector: 'ngs-dialog-root',
  templateUrl: 'root.component.html',
  styleUrls: ['root.component.scss']
})
export class NGSuiteDialogRootComponent implements NGSuiteDialogRoot {

  @ViewChild('container', {
    read: ViewContainerRef
  }) viewContainerRef: ViewContainerRef = null as any;

  constructor(
    readonly injector: Injector,
    private service: NGSuiteDialog
  ) {
    service.attach(this);
  }

}
