import { Directive, ElementRef, Input } from "@angular/core";

import { NGSuiteFormComponent } from "../components/form/form.component";
import { FormGroup } from "@angular/forms";
import { stringAttribute } from "../functions";

@Directive({
  selector: '[control]',
})
export class NGSuiteControlDirective {
  
  readonly element: HTMLElement;

  @Input({ alias: 'control', transform: stringAttribute, required: true })
  readonly name!: string;

  constructor(
    private el: ElementRef<HTMLElement>,
    private form: NGSuiteFormComponent
  ) {
    const { nativeElement } = el;
    this.element = nativeElement;
  }

  get formGroup() {
    const { form: { directive } } = this;
    return directive.form;
  }

  get entry() {
    const { name, formGroup } = this;
    return formGroup.get(name);
  }

}
