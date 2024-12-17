import { AfterContentInit, AfterViewInit, Component, ContentChildren, inject, Input, OnDestroy, QueryList } from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";

import { Subscription } from "rxjs";
import { NGSuiteFormMessageErrorComponent } from "./error/error.component";
import { NGSuiteFormMessagePendingComponent } from "./pending/pending.component";
import { NGSuiteFormComponent } from "../form.component";
import { stringAttribute } from "../../../functions";

@Component({
  selector: 'ngs-form-message',
  templateUrl: 'message.component.html',
  styleUrls: ['message.component.scss'],
  standalone: true,
  imports: [
    NgTemplateOutlet,
  ],
})
export class NGSuiteFormMessageComponent implements AfterContentInit, AfterViewInit, OnDestroy {

  private readonly form = inject(NGSuiteFormComponent);

  @Input({ alias: 'for', transform: stringAttribute, required: true })
  control!: string;

  @ContentChildren(NGSuiteFormMessageErrorComponent) errorList = new QueryList<NGSuiteFormMessageErrorComponent>();
  @ContentChildren(NGSuiteFormMessagePendingComponent) pendingList = new QueryList<NGSuiteFormMessagePendingComponent>();

  private xErrorMap = new Map<string, NGSuiteFormMessageErrorComponent>();

  info?: NGSuiteFormMessageErrorComponent | NGSuiteFormMessagePendingComponent;

  private xFormSub: Subscription;
  private xStatusSub?: Subscription;
  private xErrorSub?: Subscription;

  error?: string;

  get submitted() { return this.form.isSubmitted; }

  readonly groupDirective = this.form.directive;

  readonly group = this.groupDirective.form;

  get entry() {
    const { control, group } = this;
    return group?.get(control) || null;
  }

  constructor() {
    this.xFormSub = this.form.submitted.subscribe(this.onChange);
  }

  private processInfoList = () => {
    const { errorList, xErrorMap } = this;

    xErrorMap.clear();

    errorList.forEach(error => {
      const { when: { name } } = error;
      xErrorMap.set(name, error);
    });
  }

  onChange = () => {
    this.info = undefined;

    const { group, entry } = this;

    if (!entry || !group) return;

    switch (true) {
      case entry.pending: {
        const { pendingList } = this;
        this.info = pendingList.first;
      } break;

      case !!entry?.errors: {
        const { errors } = entry;
        const { xErrorMap } = this;

        for (const key in errors) {
          const info = xErrorMap.get(key);

          if (info) {
            this.info = info;
            break;
          }
        }

      } break;
    }
  }

  ngAfterContentInit(): void {
    const { errorList } = this;

    this.xErrorSub = errorList.changes.subscribe(this.processInfoList);

    this.processInfoList();
  }

  ngAfterViewInit(): void {
    window.setTimeout(() => {
      const { group, entry } = this;

      if (entry) {
        this.xStatusSub = entry.statusChanges.subscribe(this.onChange);
      }
    });
  }

  ngOnDestroy(): void {
    const { xFormSub, xStatusSub, xErrorSub } = this;

    xFormSub.unsubscribe();
    if (xStatusSub) xStatusSub.unsubscribe();
    if (xErrorSub) xErrorSub.unsubscribe();
  }

}
