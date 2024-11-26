import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: 'ngs-input[type=number][max][formControlName],ngs-input[type=number][max][formControl],ngs-input[type=number][max][ngModel]',
  providers: [{ provide: NG_VALIDATORS, useExisting: NGSuiteMaxValidator, multi: true }],
  standalone: true,
})
export class NGSuiteMaxValidator implements Validator {

  @Input() max: string | number | null = null;

  validate(control: AbstractControl): ValidationErrors | null {
    const { max } = this;
    const error: ValidationErrors = { max: true };

    if (max !== null) {
      const vMax = Number(max);
      if (isNaN(vMax)) return error;

      const value = control.value as number;
      if (value > vMax) return error;
    }

    return null;
  }

}
