import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, ContentChild, OnDestroy } from "@angular/core";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { NGSuiteFormInputDirective } from "../../directives/input.directive";
import { NGSuiteFormComponent } from "../form/form.component";

type ValidationStatus = 'VALID' | 'INVALID' | 'DISABLED' | 'PENDING';

@Component({
  selector: 'ngs-form-field',
  templateUrl: 'field.component.html',
  styleUrls: ['field.component.scss']
})
export class NGSuiteFormFieldComponent implements AfterViewInit, AfterContentInit, OnDestroy {

  @ContentChild(NGSuiteFormInputDirective) input: NGSuiteFormInputDirective = null as any;

  private xStateChange: BehaviorSubject<ValidationStatus>;
  readonly statusChange: Observable<ValidationStatus>

  private xStatusSub: Subscription = null as any;
  private xSubmitSub: Subscription = null as any;

  constructor(
    private cd: ChangeDetectorRef,
    public readonly form: NGSuiteFormComponent
  ) {
    this.xStateChange = new BehaviorSubject<ValidationStatus>(null as any);
    this.statusChange = this.xStateChange.asObservable();

    this.updateStatus = this.updateStatus.bind(this);
  }

  ngAfterViewInit() {
    const { cd, form: { directive } } = this;
    this.xSubmitSub = directive.ngSubmit.subscribe(this.updateStatus);
    cd.detectChanges();
  }

  ngAfterContentInit() {
    const { input, xStateChange } = this;

    if (input) {
      const { control, element } = input;

      this.xStatusSub = control.statusChanges?.subscribe((status: any) => {
        xStateChange.next(status);
      }) as Subscription;

      element.addEventListener('blur', this.updateStatus);
    }

    this.updateStatus();
  }

  ngOnDestroy() {
    const { xStatusSub, xSubmitSub, input } = this;

    if (xSubmitSub) xSubmitSub.unsubscribe();
    if (xStatusSub) xStatusSub.unsubscribe();

    if (input) {
      const { element } = input;
      element.removeEventListener('blur', this.updateStatus);
    }
  }

  private updateStatus() {
    const { xStateChange, input } = this;

    if (input) {
      const { element, control } = input;
      xStateChange.next(control.status as any);
    }
  }

}
