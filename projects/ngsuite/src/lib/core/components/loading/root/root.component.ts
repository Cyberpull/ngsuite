import { ChangeDetectorRef, Component, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { NGSuiteLoading } from "../../../services";
import { Subscription } from "rxjs";
import { NGSuiteLoadingPageComponent } from "../page/page.component";

@Component({
  selector: 'ngs-loading-root',
  templateUrl: 'root.component.html',
  styleUrls: ['root.component.scss'],
  standalone: true,
  imports: [
    NGSuiteLoadingPageComponent,
  ],
})
export class NGSuiteLoadingRootComponent {

  private readonly cd = inject(ChangeDetectorRef);
  private readonly loading = inject(NGSuiteLoading);

  readonly text = toSignal(this.loading.text, { requireSync: true });
  readonly showing = toSignal(this.loading.showing, { requireSync: true });
  readonly counter = toSignal(this.loading.count, { requireSync: true });

}
