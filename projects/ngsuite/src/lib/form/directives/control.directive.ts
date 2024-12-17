import { Directive, ElementRef, inject, Input } from "@angular/core";

import { NGSuiteFormComponent } from "../components/form/form.component";
import { stringAttribute } from "../functions";

@Directive({
  selector: '[control]',
  standalone: true,
})
export class NGSuiteControlDirective {

  private readonly el: ElementRef<HTMLElement> = inject(ElementRef);

  readonly form = inject(NGSuiteFormComponent);

  readonly element = this.el.nativeElement;

  @Input({ alias: 'control', transform: stringAttribute, required: true })
  readonly name!: string;

  readonly groupDirective = this.form.directive;

  readonly group = this.groupDirective.form;

  get entry() {
    const { name, group } = this;
    return group?.get(name) || null;
  }

}
