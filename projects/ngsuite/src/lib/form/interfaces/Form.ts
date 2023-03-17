import { NGSuiteComponent } from "../../core";

export type FormInputOnChange = (obj: any) => void;
export type FormInputOnTouched = () => void;

export type FormInputOnInit<T = HTMLElement> = (element: T) => void;

export interface FormInput<T = HTMLElement> {
  type?: string;
  autocomplete?: string;

  writeValue(value: any): void;
  registerOnChange(fn: FormInputOnChange): void;
  registerOnTouched(fn: FormInputOnTouched): void;

  registerOnInputInit(fn: FormInputOnInit<T>): void;
}

export interface FormInputMap {
  [key: string]: NGSuiteComponent<FormInput>;
}

export interface InputSelectEntry {
  label: string;
  value: any;
}
