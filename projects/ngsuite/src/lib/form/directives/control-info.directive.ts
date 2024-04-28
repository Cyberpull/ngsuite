import { Directive, ElementRef } from "@angular/core";

import { NGSuiteFormComponent } from "../components/form/form.component";
import { FormGroup } from "@angular/forms";

@Directive({
  selector: '[when]',
})
export class NGSuiteControlInfoDirective {

  readonly name: string;
  
  readonly element: HTMLElement;

  constructor(
    private el: ElementRef<HTMLElement>,
    private form: NGSuiteFormComponent
  ) {
    const { nativeElement } = el;
    this.name = nativeElement.getAttribute('when')!;
    this.element = nativeElement;
  }

}
