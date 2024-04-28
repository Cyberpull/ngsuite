import { Directive, ElementRef, Input } from "@angular/core";

import { NGSuiteFormComponent } from "../components/form/form.component";
import { FormGroup } from "@angular/forms";
import { stringAttribute } from "../functions";

@Directive({
  selector: '[control]',
})
export class NGSuiteControlDirective {
  
  readonly element: HTMLElement;

  readonly group: FormGroup;

  @Input({ alias: 'control', transform: stringAttribute, required: true })
  readonly name!: string;

  constructor(
    private el: ElementRef<HTMLElement>,
    private form: NGSuiteFormComponent
  ) {
    const { nativeElement } = el;
    this.element = nativeElement;
    this.group = form.formGroup;
  }

  get entry() {
    const { name, group } = this;
    return group.get(name);
  }

}
