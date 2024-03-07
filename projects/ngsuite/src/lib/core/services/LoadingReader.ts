import { Observable } from "rxjs";
import { LoadingWriter } from "./LoadingWriter";

export class LoadingReader {

  readonly text: Observable<string>;
  readonly counter: Observable<number>;

  constructor(writer: LoadingWriter) {
    this.text = writer.text.asObservable();
    this.counter = writer.counter.asObservable();
  }

}
