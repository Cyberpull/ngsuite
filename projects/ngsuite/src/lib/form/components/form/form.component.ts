import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from "@angular/core";

import { FormGroupDirective, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BehaviorSubject, Observable } from "rxjs";

type AutoComplete = 'on' | 'off';

@Component({
  selector: 'ngs-form',
  templateUrl: 'form.component.html',
  styleUrls: ['form.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class NGSuiteFormComponent implements AfterViewInit, OnDestroy {

  private readonly cd = inject(ChangeDetectorRef);
  readonly directive = inject(FormGroupDirective);

  @Input() autocomplete: AutoComplete = 'off';

  @Output('submit') readonly onSubmit = new EventEmitter();

  @ViewChild('form') readonly formRef!: ElementRef<HTMLFormElement>;

  private readonly xSubmittedSub = new BehaviorSubject<boolean>(false);
  readonly submitted = this.xSubmittedSub.asObservable();

  get isSubmitted() { return this.xSubmittedSub.value; }

  get dirty() { return this.directive.dirty; }
  get touched() { return this.directive.touched; }
  get untouched() { return this.directive.untouched; }
  get valueChanges() { return this.directive.valueChanges; }
  get statusChanges() { return this.directive.statusChanges; }

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
    xSubmittedSub.next(false);
    nativeElement.reset();
    directive.resetForm();
  }

}
