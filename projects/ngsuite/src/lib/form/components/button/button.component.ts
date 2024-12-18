import { Component, ElementRef, Input } from "@angular/core";
import { Icon, NGSuiteIconComponent } from "../../../core";

@Component({
  selector: 'ngs-button',
  templateUrl: 'button.component.html',
  styleUrls: ['button.component.scss'],
  standalone: true,
  imports: [
    NGSuiteIconComponent,
  ],
})
export class NGSuiteFormButtonComponent {

  @Input() icon: Icon = '';
  @Input() type: string = 'button';
  @Input() disabled: boolean = false;

  constructor(
    private el: ElementRef<HTMLElement>
  ) {
    const { nativeElement: $element } = el;
    $element.tabIndex = 1;
  }

}
