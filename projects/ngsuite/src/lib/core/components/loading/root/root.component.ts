import { Component } from "@angular/core";

@Component({
  selector: 'ngs-loading-root',
  templateUrl: 'root.component.html',
  styleUrls: ['root.component.scss']
})
export class NGSuiteLoadingRootComponent {

  public text: string = '';

  private instances: number = 0;

  get visible() { return this.instances > 0; }

  constructor() {  }

  start(text: string = '') {
    this.text = text;
    this.instances++;
  }

  stop() {
    if (!this.instances) return;

    this.instances--;

    if (!this.instances) {
      //
    }
  }

}
