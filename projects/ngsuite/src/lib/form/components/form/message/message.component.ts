import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, ContentChildren, OnDestroy, QueryList } from "@angular/core";

import { NGSuiteControlDirective } from "../../../directives/control.directive";
import { Subscription } from "rxjs";
import { NGSuiteFormMessageErrorComponent } from "./error/error.component";
import { NGSuiteFormMessagePendingComponent } from "./pending/pending.component";
import { NGSuiteFormComponent } from "../form.component";

@Component({
  selector: 'ngs-form-message',
  templateUrl: 'message.component.html',
  styleUrls: ['message.component.scss']
})
export class NGSuiteFormMessageComponent implements AfterContentInit, AfterViewInit, OnDestroy {

  @ContentChildren(NGSuiteFormMessageErrorComponent) errorList: QueryList<NGSuiteFormMessageErrorComponent>;
  @ContentChildren(NGSuiteFormMessagePendingComponent) pendingList: QueryList<NGSuiteFormMessagePendingComponent>;

  private xErrorMap: Map<string, NGSuiteFormMessageErrorComponent>;

  info?: NGSuiteFormMessageErrorComponent | NGSuiteFormMessagePendingComponent;
  
  private xFormSub: Subscription;
  private xStatusSub?: Subscription;
  private xErrorSub?: Subscription;

  error?: string;

  get submitted() { return this.control.form.isSubmitted; }

  constructor(
    private cd: ChangeDetectorRef,
    private control: NGSuiteControlDirective,
  ) {
    this.errorList = new QueryList();
    this.pendingList = new QueryList();

    this.xErrorMap = new Map();

    this.xFormSub = control.form.submitted.subscribe(this.onChange);
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
    
    const { control: { group, entry } } = this;
    
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
    const { cd, control: { group, entry } } = this;

    if (entry) {
      this.xStatusSub = entry.statusChanges.subscribe(this.onChange);
    }

    cd.detectChanges();
  }

  ngOnDestroy(): void {
    const { xFormSub, xStatusSub, xErrorSub } = this;

    xFormSub.unsubscribe();
    if (xStatusSub) xStatusSub.unsubscribe();
    if (xErrorSub) xErrorSub.unsubscribe();
  }

}
