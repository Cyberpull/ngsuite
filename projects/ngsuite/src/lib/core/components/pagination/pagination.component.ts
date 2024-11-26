import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Pagination } from "../../interfaces";
import { NGSuitePaginationInfoComponent } from "./info/info.component";

@Component({
  selector: 'ngs-pagination',
  templateUrl: 'pagination.component.html',
  styleUrls: ['pagination.component.scss'],
  standalone: true,
  imports: [
    NGSuitePaginationInfoComponent,
  ],
})
export class NGSuitePaginationComponent {

  @Input() data: Pagination = null as any;

  @Output() callback: EventEmitter<number>;

  constructor() {
    this.callback = new EventEmitter<number>();
  }

  navigate(page: number) {
    this.callback.emit(page);
  }

}
