import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Icon } from '../../../interfaces';
import { NGSuiteIconComponent } from '../../icon/icon.component';

@Component({
  selector: 'ngs-panel-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
  standalone: true,
  imports: [
    NGSuiteIconComponent,
  ],
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
