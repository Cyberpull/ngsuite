import { Directive, ElementRef } from "@angular/core";

import { NGSuiteFormComponent } from "../components/form/form.component";
import { FormGroup } from "@angular/forms";

@Directive({
  selector: '[control]',
})
export class NGSuiteControlDirective {

  readonly name: string;
  
  readonly element: HTMLElement;

  readonly group: FormGroup;

  constructor(
    private el: ElementRef<HTMLElement>,
    private form: NGSuiteFormComponent
  ) {
    const { nativeElement } = el;
    this.name = nativeElement.getAttribute('control')!;
    this.element = nativeElement;
    this.group = form.formGroup;
  }

  get entry() {
    const { name, group } = this;
    return group.get(name);
  }

}
