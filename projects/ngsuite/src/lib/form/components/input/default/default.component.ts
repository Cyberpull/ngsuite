import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from "@angular/core";
import { FormInput, FormInputOnChange, FormInputOnInit, FormInputOnTouched } from "../../../interfaces";

@Component({
  selector: 'ngs-input-defaut',
  templateUrl: 'default.component.html',
  styleUrls: ['default.component.scss']
})
export class NGSuiteFormInputDefaultComponent implements FormInput<HTMLInputElement>, AfterViewInit {

  type: string = 'text';
  autocomplete: string = '';

  value: any = null;
  onChange: FormInputOnChange = null as any;
  onTouched: FormInputOnTouched = null as any;
  onInputInit: FormInputOnInit<HTMLInputElement> = null as any;

  @ViewChild('input') inputRef: ElementRef<HTMLInputElement> = null as any;

  constructor(
    private cd: ChangeDetectorRef
  ) {  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: FormInputOnChange): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: FormInputOnTouched): void {
    this.onTouched = fn;
  }

  registerOnInputInit(fn: FormInputOnInit<HTMLInputElement>): void {
    this.onInputInit = fn;
  }

  ngAfterViewInit() {
    const { nativeElement: input } = this.inputRef;
    this.onInputInit(input);
    this.cd.detectChanges();
  }

}
