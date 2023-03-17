import { Injectable } from "@angular/core";
import { GuardDataInterface } from "../interfaces";

@Injectable()
export class GuardDataService implements GuardDataInterface {

  private data = new Map<string, any>();

  has(key: string) { return this.data.has(key); }

  set(key: string, value: any) {
    return this.data.set(key, value);
  }

  get<T = any>(key: string): T {
    return this.data.get(key);
  }

}
