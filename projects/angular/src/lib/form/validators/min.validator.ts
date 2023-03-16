import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: 'ngs-input[type=number][min][formControlName],ngs-input[type=number][min][formControl],ngs-input[type=number][min][ngModel]',
  providers: [{ provide: NG_VALIDATORS, useExisting: NGSuiteMinValidator, multi: true }]
})
export class NGSuiteMinValidator implements Validator {

  @Input() min: string | number | null = null;

  validate(control: AbstractControl): ValidationErrors | null {
    const { min } = this;
    const error: ValidationErrors = { min: true };

    if (min !== null) {
      const vMin = Number(min);
      if (isNaN(vMin)) return error;

      const value = control.value as number;
      if (value < vMin) return error;
    }

    return null;
  }

}
