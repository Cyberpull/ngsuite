import { Directive, Input } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";
import { stringAttribute } from "../functions/attributes";

@Directive({
  selector: '[equals]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: NGSuiteEqualsValidator,
      multi: true
    }
  ],
  standalone: true,
})
export class NGSuiteEqualsValidator implements Validator {

  @Input({ transform: stringAttribute })
  equals: string = '';

  constructor() {  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    const { equals } = this;
    const { parent: form } = control;
    const error = { equals: true };

    if (!equals || !form) return error;

    const ctrl = form.get(equals);
    if (!ctrl || ctrl.value !== control.value) return error;

    return null;

  }

}
