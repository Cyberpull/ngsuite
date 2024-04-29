import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnDestroy, Optional, Output, ViewChild } from "@angular/core";
import { FormGroup, FormGroupDirective } from "@angular/forms";
import { BehaviorSubject, Observable } from "rxjs";

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

  readonly submitted: Observable<boolean>;
  private xSubmittedSub: BehaviorSubject<boolean>;
  
  get isSubmitted() { return this.xSubmittedSub.value; }

  constructor(
    private cd: ChangeDetectorRef,
    readonly directive: FormGroupDirective
  ) {
    this.xSubmittedSub = new BehaviorSubject(false);
    this.submitted = this.xSubmittedSub.asObservable();

    this.onSubmit = new EventEmitter();
  }

  ngOnDestroy() {
    //
  }

  ngAfterViewInit() {
    const { cd, directive } = this;

    cd.detectChanges();
  }

  onFormSubmit(e: Event) {
    e.preventDefault();
    e.stopPropagation();

    const { directive, xSubmittedSub, onSubmit } = this;

    xSubmittedSub.next(true);

    if (directive.valid) {
      onSubmit.emit(directive.value);
      return;
    }

    const { formRef: { nativeElement } } = this;

    const input = nativeElement.querySelector('ng-invalid') as HTMLElement;
    if (input) input.focus();
  }

  submit() {
    const { formRef: { nativeElement} } = this;
    nativeElement.requestSubmit();
  }

  reset() {
    const { directive, formRef: { nativeElement}, xSubmittedSub } = this;
    nativeElement.reset();
    directive.resetForm();
    xSubmittedSub.next(false);
  }

}
