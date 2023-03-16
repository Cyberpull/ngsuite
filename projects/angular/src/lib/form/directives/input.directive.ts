import { Directive, ElementRef } from "@angular/core";
import { NgControl } from "@angular/forms";

@Directive({
  selector: '[formControl], [formControlName], [ngModel]'
})
export class NGSuiteFormInputDirective {

  readonly element: HTMLElement;

  constructor(
    private el: ElementRef<HTMLElement>,
    public readonly control: NgControl
  ) {
    this.element = el.nativeElement;
  }

}
