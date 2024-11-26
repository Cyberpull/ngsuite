import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Pagination } from "../../../interfaces";
import { NgClass } from "@angular/common";

const LinkCount = 10;

@Component({
  selector: 'ngs-pagination-info',
  templateUrl: 'info.component.html',
  styleUrls: ['info.component.scss'],
  standalone: true,
  imports: [
    NgClass,
  ],
})
export class NGSuitePaginationInfoComponent {

  private _data: Pagination = null as any;

  get data() { return this._data; }

  @Input() set data(value: Pagination) {
    this._data = value;
    this.update();
  }

  @Output() callback: EventEmitter<number>;

  private _from: number = 0;
  get from() { return this._from; }

  private _to: number = 0;
  get to() { return this._to; }

  private _pageInfo: string = '';
  get pageInfo() { return this._pageInfo; }

  private _records: string = '';
  get records() { return this._records; }

  private _links: number[] = [];
  get links() { return this._links; }

  // Links ----------------------
  private _start: number = 0;
  get start() { return this._start; }

  private _stop: number = 0;
  get stop() { return this._stop; }

  private _leftpad: boolean = false;
  get leftpad() { return this._leftpad; }

  private _rightpad: boolean = false;
  get rightpad() { return this._rightpad; }

  constructor() {
    this.callback = new EventEmitter<number>();
  }

  private update() {
    const { data } = this;

    if (!data) {
      this.clear();
      return;
    }

    this.generateSummary();
    this.generateLinks();
  }

  private clear() {
    this._pageInfo = '';
    this._records = '';
  }

  private generateSummary() {
    const { data } = this;

    let from, to;

    if (!data.total) {
      from = to = 0;
    } else {
      from = (data.current_page * data.per_page) - data.per_page + 1;
      to = from - 1 + data.data.length;
    }

    this._pageInfo = `Showing page ${data.current_page}`;
    this._records = `${from} - ${to} of ${data.total} record` + ((data.total) ? '' : '');
    this._records += (data.total > 1) ? 's' : '';
  }

  private generateLinks() {
    const { data } = this;

    this._links = [];

    let start = 0, stop = 0;

    switch (data.current_page) {
      case 1: {
        start = 2;
        stop = data.last_page - 1;
        stop = Math.min(9, stop);
      } break;

      case data.last_page: {
        start = Math.max(2, data.last_page - 8);
        stop = data.last_page - 1;
      } break;

      default: {
        start = Math.max(2, data.current_page - 4);

        if (start <= 4) {
          stop = Math.min(start + 7, data.last_page - 1);
        } else {
          stop = Math.min(data.current_page + 3, data.last_page - 1);
          start = Math.max(2, stop - 7);
        }
      }
    }

    this._leftpad = (start - 1) > 1;
    this._rightpad = (data.last_page - stop) > 1;

    for (let i = start; i <= stop; i++) {
      this._links.push(i);
    }
  }

  next(e: Event) {
    e.preventDefault();

    const { data } = this;
    const page = Math.min(data.current_page + 1, data.last_page);
    this.navigate(page);
  }

  prev(e: Event) {
    e.preventDefault();

    const { data } = this;
    const page = Math.max(data.current_page - 1, 1);
    this.navigate(page);
  }

  navigate(page: number, e?: Event) {
    if (e) e.preventDefault();
    this.callback.emit(page);
  }

  isDisabled(page: number) {
    const { data } = this;
    if (!data) return true;

    return (data.current_page === page);
  }

  get isPrevDisabled() {
    const { data } = this;
    if (!data) return true;

    return (data.current_page === 1);
  }

  get isNextDisabled() {
    const { data } = this;
    if (!data) return true;

    return (data.current_page === data.last_page);
  }

  get lastPage() {
    const { data } = this;
    if (!data) return 1;
    return data.last_page;
  }

  get showLastPage() {
    const { data } = this;
    if (!data) return false;
    return (data.last_page > 1);
  }

  get hasPadding() {
    const { data } = this;
    if (!data) return false;
    return (data.last_page > LinkCount);
  }

}
