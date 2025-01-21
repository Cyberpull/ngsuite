import { Component, forwardRef, input } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { NGSuiteSelectTextFn, NGSuiteSelectValueFn } from "../../interfaces";

export const NGSuiteSelectComponentRef = forwardRef(() => NGSuiteSelectComponent);

@Component({
  selector: 'ngs-select',
  templateUrl: 'select.component.html',
  styleUrls: ['select.component.scss'],
  standalone: true,
  imports: [],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: NGSuiteSelectComponent,
    multi: true
  }]
})
export class NGSuiteSelectComponent implements ControlValueAccessor {

  private onChange = (obj: any) => {};
  private onTouched = (obj: any) => {};

  readonly data = input.required<any[]>();
  readonly getText = input.required<NGSuiteSelectTextFn>();
  readonly getValue = input.required<NGSuiteSelectValueFn>();

  disabled: boolean = false;

  writeValue(obj: any): void {
    //
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
