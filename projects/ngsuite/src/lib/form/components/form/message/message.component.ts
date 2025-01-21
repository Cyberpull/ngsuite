import { AfterContentInit, AfterViewInit, Component, ComponentRef, computed, ContentChildren, inject, Injector, input, Input, OnDestroy, QueryList, ViewChild, ViewContainerRef } from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";

import { Subscription } from "rxjs";
import { NGSuiteFormMessageErrorComponent } from "./error/error.component";
import { NGSuiteFormMessagePendingComponent } from "./pending/pending.component";
import { NGSuiteFormComponent } from "../form.component";
import { NGSuiteComponent } from "../../../../core/interfaces/Component";
import { stringAttribute } from "../../../functions";
import { AbstractControl, FormControl } from "@angular/forms";

type MessageInfo = NGSuiteFormMessageErrorComponent | NGSuiteFormMessagePendingComponent;

@Component({
  selector: 'ngs-form-message',
  templateUrl: 'message.component.html',
  styleUrls: ['message.component.scss'],
  standalone: true,
  imports: [],
})
export class NGSuiteFormMessageComponent implements AfterContentInit, AfterViewInit, OnDestroy {

  private readonly injector = inject(Injector);
  private readonly form = inject(NGSuiteFormComponent);

  readonly for = input<string | AbstractControl>('');

  readonly entry = computed(() => {
    const prop = this.for();
    if (!prop) return null;

    if (typeof (prop) === 'string') {
      const form = this.form.directive.form;
      return form.controls[prop];
    }

    return prop;
  });

  @ViewChild('container', { read: ViewContainerRef })
  viewContainerRef!: ViewContainerRef;

  private componentRef?: ComponentRef<any>;

  @ContentChildren(NGSuiteFormMessageErrorComponent)
  errorList = new QueryList<NGSuiteFormMessageErrorComponent>();

  @ContentChildren(NGSuiteFormMessagePendingComponent)
  pendingList = new QueryList<NGSuiteFormMessagePendingComponent>();

  private xErrorMap = new Map<string, NGSuiteFormMessageErrorComponent>();

  private xFormSub: Subscription;
  private xStatusSub?: Subscription;
  private xValueSub?: Subscription;
  private xErrorSub?: Subscription;

  error?: string;

  get submitted() { return this.form.isSubmitted; }

  constructor() {
    this.xFormSub = this.form.submitted.subscribe(this.onChange);
  }

  private processInfoList = () => {
    const { errorList, xErrorMap } = this;

    xErrorMap.clear();

    errorList.forEach(error => {
      const { when } = error;
      xErrorMap.set(when, error);
    });
  }

  private attach = (content: MessageInfo) => {
    const { viewContainerRef } = this;
    viewContainerRef.createEmbeddedView(content.template);
  }

  private clear = () => {
    const { viewContainerRef } = this;

    if (viewContainerRef) {
      viewContainerRef.clear();
    }
  }

  onChange = () => {
    const { xErrorMap } = this;

    const entry = this.entry();

    this.clear();

    if (!entry) return;

    if (entry.pending) {
      const { pendingList } = this;
      this.attach(pendingList.first);
      return;
    }

    if (!entry.errors) return;

    const { errors } = entry;

    for (const key in errors) {
      const info = xErrorMap.get(key);

      if (info) {
        this.attach(info);
        break;
      }
    }
  }

  ngAfterContentInit(): void {
    const { errorList } = this;

    this.xErrorSub = errorList.changes.subscribe(this.processInfoList);

    this.processInfoList();
  }

  ngAfterViewInit(): void {
    window.setTimeout(() => {
      const entry = this.entry();

      if (entry) {
        this.xValueSub = entry.valueChanges.subscribe(this.onChange);
        this.xStatusSub = entry.statusChanges.subscribe(this.onChange);
      }
    });
  }

  ngOnDestroy(): void {
    const { xFormSub, xValueSub, xStatusSub, xErrorSub } = this;

    xFormSub.unsubscribe();
    if (xValueSub) xValueSub.unsubscribe();
    if (xStatusSub) xStatusSub.unsubscribe();
    if (xErrorSub) xErrorSub.unsubscribe();
  }

}
