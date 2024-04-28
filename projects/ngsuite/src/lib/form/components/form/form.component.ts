import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnDestroy, Optional, Output, ViewChild } from "@angular/core";
import { FormGroup, FormGroupDirective } from "@angular/forms";

type AutoComplete = 'on' | 'off';

@Component({
  selector: 'ngs-form',
  templateUrl: 'form.component.html',
  styleUrls: ['form.component.scss']
})
export class NGSuiteFormComponent implements AfterViewInit, OnDestroy {

  @Input() autocomplete: AutoComplete = 'off';

  @Output('submit') readonly onSubmit: EventEmitter<any>;

  @ViewChild('form') readonly formRef: ElementRef<HTMLFormElement> = null as any;

  readonly formGroup: FormGroup<any>;

  constructor(
    private cd: ChangeDetectorRef,
    readonly directive: FormGroupDirective
  ) {
    this.onSubmit = new EventEmitter();
    this.formGroup = directive.form;
  }

  ngOnDestroy() {
    //
  }

  ngAfterViewInit() {
    const { cd } = this;
    cd.detectChanges();
  }

  onFormSubmit(e: Event) {
    e.preventDefault();
    e.stopPropagation();

    const { formGroup, onSubmit } = this;

    if (formGroup.valid) {
      onSubmit.emit(formGroup.value);
    }
  }

  submit() {
    const { formRef: { nativeElement} } = this;
    nativeElement.requestSubmit();
  }

  reset() {
    const { directive, formRef: { nativeElement} } = this;
    nativeElement.reset();
    directive.resetForm();
  }

}
