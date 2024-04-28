import { Directive, ElementRef, Input } from "@angular/core";

import { NGSuiteFormComponent } from "../components/form/form.component";
import { stringAttribute } from "../functions";

@Directive({
  selector: '[when]',
})
export class NGSuiteControlInfoDirective {

  @Input({ alias: 'when', transform: stringAttribute, required: true })
  readonly name!: string;
  
  readonly element: HTMLElement;

  constructor(
    private el: ElementRef<HTMLElement>,
    private form: NGSuiteFormComponent
  ) {
    const { nativeElement } = el;
    this.element = nativeElement;
  }

}
