import { Component, ElementRef, inject, Input, TemplateRef, ViewChild } from "@angular/core";
import { NGSuiteControlInfoDirective } from "../../../../directives/control-info.directive";
import { NGSuiteFormMessageComponent } from "../message.component";
import { stringAttribute } from "../../../../functions";

@Component({
  selector: 'ngs-message-error',
  templateUrl: 'error.component.html',
  styleUrls: ['error.component.scss'],
  standalone: true,
  imports: [],
})
export class NGSuiteFormMessageErrorComponent {

  private readonly elemRef: ElementRef<HTMLElement> = inject(ElementRef);
  private readonly message = inject(NGSuiteFormMessageComponent);

  @Input({ transform: stringAttribute, required: true })
  readonly when!: string;

  readonly element = this.elemRef.nativeElement;

  @ViewChild('template') readonly template!: TemplateRef<HTMLElement>;

}
