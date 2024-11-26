import { Directive, ElementRef, Input } from "@angular/core";

import { NGSuiteFormComponent } from "../components/form/form.component";
import { stringAttribute } from "../functions";

@Directive({
  selector: '[control]',
  standalone: true,
})
export class NGSuiteControlDirective {

  readonly element: HTMLElement;

  @Input({ alias: 'control', transform: stringAttribute, required: true })
  readonly name!: string;

  constructor(
    private el: ElementRef<HTMLElement>,
    readonly form: NGSuiteFormComponent
  ) {
    const { nativeElement } = el;
    this.element = nativeElement;
  }

  get groupDirective() {
    const { form: { directive } } = this;
    return directive;
  }

  get group() {
    const { groupDirective } = this;
    return groupDirective.form;
  }

  get entry() {
    const { name, group } = this;
    return group?.get(name) || null;
  }

}
