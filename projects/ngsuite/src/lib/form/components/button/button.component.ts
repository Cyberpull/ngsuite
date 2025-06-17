import { Component, computed, ElementRef, HostBinding, inject, input } from "@angular/core";
import { Icon, NGSuiteIconComponent } from "../../../core";
import { NgClass } from "@angular/common";

import {
  ButtonDirection,
  ButtonSize,
  ButtonTheme,
  ButtonType,
} from "../../interfaces";

@Component({
  selector: 'ngs-button',
  templateUrl: 'button.component.html',
  styleUrls: ['button.component.scss'],
  standalone: true,
  imports: [
    NgClass,
    NGSuiteIconComponent,
  ],
})
export class NGSuiteFormButtonComponent {

  private readonly ref: ElementRef<HTMLElement> = inject(ElementRef);

  readonly icon = input<Icon>();
  readonly theme = input<ButtonTheme>('default');
  readonly type = input<ButtonType>('button');
  readonly size = input<ButtonSize>('md');
  readonly direction = input<ButtonDirection>('normal');

  readonly block = input<boolean>(false);
  readonly disabled = input<boolean>(false);

  readonly btnClassNames = computed(() => {
    const names: string[] = [];

    const direction = this.direction();
    if (direction === 'reversed') names.push(direction);

    return names;
  });

  readonly classNames = computed(() => {
    const names: string[] = [this.theme(), this.size()];
    return names.join(' ');
  });

  @HostBinding('class')
  get bindClass() { return this.classNames(); }

  @HostBinding('class.block')
  get isBlock() { return this.block(); }

  @HostBinding('class.disabled')
  get isDisabled() { return this.disabled(); }

  constructor() {
    const { ref: { nativeElement } } = this;
    nativeElement.tabIndex = 1;
  }

}
