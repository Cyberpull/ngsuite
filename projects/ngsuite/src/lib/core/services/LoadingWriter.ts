import { BehaviorSubject } from "rxjs";

export class LoadingWriter {

  readonly text: BehaviorSubject<string>;
  readonly counter: BehaviorSubject<number>;

  constructor() {
    this.text = new BehaviorSubject('');
    this.counter = new BehaviorSubject(0);
  }

}
