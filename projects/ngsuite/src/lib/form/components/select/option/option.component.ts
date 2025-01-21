import { Component, input } from "@angular/core";
import { NGSuiteSelectTextFn, NGSuiteSelectValueFn } from "../../../interfaces";

@Component({
  selector: 'ngs-select-option',
  templateUrl: 'option.component.html',
  styleUrls: ['option.component.scss'],
  standalone: true,
  imports: [],
})
export class NGSuiteSelectOptionComponent {

  readonly data = input.required<any[]>();
  readonly getText = input.required<NGSuiteSelectTextFn>();
  readonly getValue = input.required<NGSuiteSelectValueFn>();

}
