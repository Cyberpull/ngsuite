import { computed, effect, Injectable, signal } from "@angular/core";
import { Registry } from "../../Registry";
import { NGSuiteDialogInstance } from "./DialogInstance";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NGSuiteDialogRegistry {

  private readonly list = signal<NGSuiteDialogInstance[]>([]);

  get count() { return this.xCount; }
  private xCount = 0;

  constructor() {
    effect(() => {
      const entries = this.list();

      this.xCount = entries.length;
      console.log(entries.length);

      // =================

      const isOpen = entries.length > 0;
      const body = document.querySelector('body');
      body?.classList.toggle('ngs-dialog-open', isOpen);
    });
  }

  private readonly cloneList = () => Array.from(this.list());

  readonly active = () => {
    const entries = this.cloneList();
    if (!entries.length) return null;

    const lastIndex = entries.length - 1;
    return entries[lastIndex];
  }

  readonly focus = () => {
    const item = this.active();
    item?.focus();
  }

  readonly add = (...items: NGSuiteDialogInstance[]) => {
    const entries = this.cloneList();

    entries.push(...items);

    this.list.set(entries);
  }

  readonly remove = (item: NGSuiteDialogInstance) => {
    const entries = this.cloneList();

    const index = entries.indexOf(item);
    entries.splice(index, 1);

    this.list.set(entries);
  }

  readonly closeAll = () => {
    const entries = this.cloneList();

    while (entries.length) {
      const instance = entries.pop();
      instance?.close(false);
    }

    this.list.set(entries);
  }

  readonly clear = () => {
    this.list.set([]);
  }

}

Registry.add(NGSuiteDialogRegistry);
