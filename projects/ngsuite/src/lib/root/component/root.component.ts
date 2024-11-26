import { Component } from "@angular/core";
import { NGSuiteLoadingRootComponent } from "../../core";
import { NGSuiteDialogRootComponent } from "../../dialog";

@Component({
  selector: 'ngs-root',
  templateUrl: 'root.component.html',
  styleUrls: ['root.component.scss'],
  standalone: true,
  imports: [
    NGSuiteLoadingRootComponent,
    NGSuiteDialogRootComponent,
  ],
})
export class NGSuiteRootComponent {

}
