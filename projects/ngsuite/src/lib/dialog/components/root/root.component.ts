import { Component, Injector, OnDestroy, ViewChild, ViewContainerRef } from "@angular/core";
import { NGSuiteDialogRoot } from "../../interfaces";
import { NGSuiteDialog } from "../../services";

@Component({
  selector: 'ngs-dialog-root',
  templateUrl: 'root.component.html',
  styleUrls: ['root.component.scss'],
  standalone: true,
  imports: [],
})
export class NGSuiteDialogRootComponent implements NGSuiteDialogRoot, OnDestroy {

  @ViewChild('container', {
    read: ViewContainerRef
  }) viewContainerRef: ViewContainerRef = null as any;

  constructor(
    readonly injector: Injector,
    private service: NGSuiteDialog
  ) {
    NGSuiteDialog.attach(service, this);
  }

  ngOnDestroy(): void {
    const { service } = this;
    NGSuiteDialog.detach(service);
  }

}
