import { Component, Input } from "@angular/core";

@Component({
  selector: 'ngs-container',
  templateUrl: 'container.component.html',
  styleUrls: ['container.component.scss']
})
export class NGSuiteContainerComponent {

  @Input() loading: boolean = false;

  constructor() {  }

}
