import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  input,
  Input,
  OnDestroy,
  output,
  Output,
  viewChild,
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

  readonly autocomplete = input('off');

  readonly onSubmit = output({ alias: 'submit' });

  readonly formRef = viewChild.required<ElementRef<HTMLFormElement>>('form');

  // @ViewChild('form') readonly formRef!: ElementRef<HTMLFormElement>;

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

    const formRef = this.formRef();
    const { nativeElement } = formRef;

    const input = nativeElement.querySelector('ng-invalid') as HTMLElement;
    if (input) input.focus();
  }

  submit() {
    const formRef = this.formRef();
    formRef.nativeElement.requestSubmit();
  }

  reset() {
    const formRef = this.formRef();
    formRef.nativeElement.reset();

    const { directive, xSubmittedSub } = this;
    xSubmittedSub.next(false);
    directive.resetForm();
  }

}
