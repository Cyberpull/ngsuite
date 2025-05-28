import { ComponentRef, ElementRef, Injector, ViewContainerRef } from "@angular/core";
import { Observable, Subscriber } from "rxjs";
import { NGSuiteComponent } from "../../core";
import { NGSuiteDialogComponent } from "../components/dialog/dialog.component";
import { NGSuiteDialogCommand, NGSuiteDialogConfig, NGS_DIALOG_CONFIG, NGS_DIALOG_CONTENT } from "../interfaces/Dialog";
import { NGSuiteDialogRef } from "./DialogRef";

type OnClosedFn = (ins: NGSuiteDialogInstance) => void;

export class NGSuiteDialogInstance {

  private xDialogComponentRef: ComponentRef<NGSuiteDialogComponent> = null as any;

  private command: Observable<NGSuiteDialogCommand>;
  private subscriber: Subscriber<NGSuiteDialogCommand<any>> = null as any;

  private xAfterClosed: Observable<any>;
  private xAfterClosedSubscriber: Subscriber<any> = null as any;
  get afterClosed() { return this.xAfterClosed; }

  constructor(
    private xViewContainerRef: ViewContainerRef,
    private component: NGSuiteComponent<any>,
    private injector: Injector,
    private onClosed: OnClosedFn,
    private config?: NGSuiteDialogConfig
  ) {
    this.command = new Observable<NGSuiteDialogCommand<any>>(subscriber => {
      const dialogRef = new NGSuiteDialogRef<any>(subscriber);
      this.subscriber = subscriber;

      const newInjector = Injector.create({
        parent: injector,
        providers: [
          { provide: NGSuiteDialogRef, useValue: dialogRef },
          { provide: NGS_DIALOG_CONFIG, useValue: config },
          { provide: NGS_DIALOG_CONTENT, useValue: component }
        ],
      });

      this.xDialogComponentRef = xViewContainerRef.createComponent(NGSuiteDialogComponent, {
        injector: newInjector,
        index: undefined
      });
    });

    this.processCommand = this.processCommand.bind(this);

    this.command.subscribe(this.processCommand);

    this.xAfterClosed = new Observable<any>(subscriber => {
      this.xAfterClosedSubscriber = subscriber;
    });

    this.xAfterClosed.subscribe();
  }

  private processCommand(cmd: NGSuiteDialogCommand<any>) {
    const { config } = this;

    switch (cmd.name) {
      case 'esc.close': {
        if (config?.closeOnEsc !== false) this.close(cmd.value);
      } break;

      case 'close': {
        this.close(cmd.value);
      } break;
    }
  }

  focus() {
    const { xDialogComponentRef: { instance } } = this;
    instance.focus();
  }

  close(data?: any) {
    const { xDialogComponentRef } = this;
    xDialogComponentRef.destroy();

    const { xAfterClosedSubscriber } = this;
    xAfterClosedSubscriber.next(data);
    xAfterClosedSubscriber.complete();

    this.onClosed(this);
  }

  send(cmd: NGSuiteDialogCommand<any>) {
    const { subscriber } = this;
    subscriber.next(cmd);
  }

}
