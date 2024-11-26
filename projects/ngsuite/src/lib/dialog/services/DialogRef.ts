import { Injectable } from "@angular/core";
import { Subscriber } from "rxjs";
import { Registry } from "../../Registry";
import { NGSuiteDialogCommand } from "../interfaces/Dialog";

@Injectable()
export class NGSuiteDialogRef<T> {

  constructor(
    private subscriber: Subscriber<NGSuiteDialogCommand>
  ) {  }

  close(data: any) {
    const { subscriber } = this;

    subscriber.next({
      name: 'close',
      value: data
    });

    subscriber.complete();
  }

}

Registry.add(NGSuiteDialogRef);
