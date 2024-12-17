import { Component, ElementRef, inject, Input, TemplateRef, ViewChild, ViewContainerRef, ViewRef } from "@angular/core";
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

  private readonly message = inject(NGSuiteFormMessageComponent);

  readonly view = inject(ViewContainerRef);
  readonly elemRef: ElementRef<HTMLElement> = inject(ElementRef);
  readonly element = this.elemRef.nativeElement;

  @Input({ transform: stringAttribute, required: true })
  readonly when!: string;

  @ViewChild('template') readonly template!: TemplateRef<HTMLElement>;

}
