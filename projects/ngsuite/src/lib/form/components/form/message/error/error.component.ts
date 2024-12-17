import { Component, inject, TemplateRef, ViewChild } from "@angular/core";
import { NGSuiteControlInfoDirective } from "../../../../directives/control-info.directive";
import { NGSuiteFormMessageComponent } from "../message.component";

@Component({
  selector: 'ngs-message-error',
  templateUrl: 'error.component.html',
  styleUrls: ['error.component.scss'],
  standalone: true,
  imports: [],
})
export class NGSuiteFormMessageErrorComponent {

  private readonly message = inject(NGSuiteFormMessageComponent);
  readonly when = inject(NGSuiteControlInfoDirective);

  @ViewChild('template') readonly template!: TemplateRef<HTMLElement>;

}
