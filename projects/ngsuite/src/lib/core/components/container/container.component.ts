import { Component, Input } from "@angular/core";

@Component({
  selector: 'ngs-container',
  templateUrl: 'container.component.html',
  styleUrls: ['container.component.scss'],
  standalone: true,
  imports: [],
})
export class NGSuiteContainerComponent {

  @Input() loading: boolean = false;

  constructor() {  }

}
