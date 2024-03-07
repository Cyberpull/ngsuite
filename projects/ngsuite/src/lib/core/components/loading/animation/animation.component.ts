import { Component } from '@angular/core';
import { LoadingReader } from '../../../services';

@Component({
  selector: 'ngs-loading-animation',
  templateUrl: 'animation.component.html',
  styleUrls: ['animation.component.scss']
})
export class NGSuiteLoadingAnimationComponent {

  constructor(
    private reader: LoadingReader
  ) {  }

}
