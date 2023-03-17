import { AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, ComponentRef, ElementRef, forwardRef, Injector, Input, OnDestroy, Optional, QueryList, ViewChild, ViewChildren, ViewContainerRef } from "@angular/core";
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Subscription } from "rxjs";
import { NGSuiteComponent } from "../../../core";
import { FormInputMap, FormInput, FormInputOnChange, FormInputOnTouched, InputSelectEntry } from "../../interfaces";

import { NGSuiteFormInputDefaultComponent } from "./default/default.component";

const InputComponents: FormInputMap = {};

@Component({
  selector: 'ngs-input',
  templateUrl: 'input.component.html',
  styleUrls: ['input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NGSuiteFormInputComponent),
      multi: true
    }
  ]
})
export class NGSuiteFormInputComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {

  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() autocomplete: string = '';
  @Input('data-style') style: string = '';

  @Input() entries: InputSelectEntry[] = [];

  get labelRef() { return this._labelRef; }
  @ViewChild('placeholder') _labelRef: ElementRef<HTMLElement> = null as any;

  value: any = null;
  onChange: FormInputOnChange = null as any;
  onTouched: FormInputOnTouched = null as any;

  get control() { return this._control; }
  private _control: NgControl = null as any;

  isFocused: boolean = false;

  get isActive() {
    return this.isFocused || this.control?.value
  }

  constructor(
    private injector: Injector,
    private cd: ChangeDetectorRef
  ) {}

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: FormInputOnChange): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: FormInputOnTouched): void {
    this.onTouched = fn;
  }

  ngAfterViewInit() {
    const { injector } = this;
    this._control = injector.get(NgControl);

    this.cd.detectChanges();
  }

  ngOnDestroy() {
    //
  }

}
