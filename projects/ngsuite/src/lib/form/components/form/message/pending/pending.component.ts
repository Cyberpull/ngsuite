import { Component, inject, TemplateRef, ViewChild, ViewContainerRef } from "@angular/core";
import { NGSuiteFormMessageComponent } from "../message.component";

@Component({
  selector: 'ngs-message-pending',
  templateUrl: 'pending.component.html',
  styleUrls: ['pending.component.scss'],
  standalone: true,
  imports: [],
})
export class NGSuiteFormMessagePendingComponent {

  readonly view = inject(ViewContainerRef);

  @ViewChild('template') readonly template!: TemplateRef<HTMLElement>;

  constructor(
    private message: NGSuiteFormMessageComponent
  ) {}

}
