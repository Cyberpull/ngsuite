import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Icon } from '../../../interfaces';

@Component({
  selector: 'ngs-panel-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})
export class NGSuitePanelHeaderComponent {

  @Input() icon: Icon = '';

  @Output() refresh: EventEmitter<boolean>;

  constructor() {
    this.refresh = new EventEmitter<boolean>();
  }

  onRefresh() {
    const { refresh } = this;
    refresh.emit();
  }

}
