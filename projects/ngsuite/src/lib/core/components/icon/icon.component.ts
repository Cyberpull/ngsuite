import { Component, Input } from '@angular/core';
import { Icon } from '../../interfaces';

@Component({
  selector: 'ngs-icon',
  templateUrl: 'icon.component.html',
  styleUrls: ['icon.component.scss']
})
export class NGSuiteIconComponent {

  @Input() name: Icon = [];
  @Input() animate: boolean = false;

  get icon(): string | string[] {
    const { name } = this;

    if (typeof(name) === 'string') return name;

    if (Array.isArray(name)) return name;

    if (typeof(name) === 'object') return [
      `material-symbols-${name.type}`,
      name.name
    ];

    return '';
  }

  constructor() {  }

}
