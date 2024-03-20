import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from "@angular/core";
import { FormGroup, FormGroupDirective } from "@angular/forms";

type AutoComplete = 'on' | 'off';

@Component({
  selector: 'ngs-form',
  templateUrl: 'form.component.html',
  styleUrls: ['form.component.scss']
})
export class NGSuiteFormComponent implements AfterViewInit, OnDestroy {

  @Input() formGroup: FormGroup = null as any;
  @Input() autocomplete: AutoComplete = 'off';

  @Output('submit') readonly onSubmit: EventEmitter<any>;

  @ViewChild(FormGroupDirective) readonly directive: FormGroupDirective = null as any;
  @ViewChild('form') readonly formRef: ElementRef<HTMLFormElement> = null as any;

  constructor(
    private cd: ChangeDetectorRef
  ) {
    this.onSubmit = new EventEmitter();
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
