import { Component, ViewChild, ViewContainerRef } from "@angular/core";

@Component({
  selector: 'ngs-dialog-root',
  templateUrl: 'root.component.html',
  styleUrls: ['root.component.scss']
})
export class NGSuiteDialogRootComponent {

  @ViewChild('container', {
    read: ViewContainerRef
  }) viewContainerRef: ViewContainerRef = null as any;

  constructor() {  }

}
