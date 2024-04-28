import { Component, TemplateRef, ViewChild } from "@angular/core";
import { NGSuiteFormMessageComponent } from "../message.component";

@Component({
  selector: 'ngs-message-pending',
  templateUrl: 'pending.component.html',
  styleUrls: ['pending.component.scss']
})
export class NGSuiteFormMessagePendingComponent {

  @ViewChild('template') readonly template!: TemplateRef<HTMLElement>;

  constructor(
    private message: NGSuiteFormMessageComponent
  ) {}
  
}
