import { ApplicationRef, ComponentRef, createComponent, Injectable } from "@angular/core";
import { NGSuiteLoadingRootComponent } from "../components";
import { Registry } from "../Registry";

@Injectable()
export class NGSuiteLoading {

  private rootComponentRef: ComponentRef<NGSuiteLoadingRootComponent>;

  constructor(
    private appRef: ApplicationRef
  ) {
    this.rootComponentRef = createComponent(NGSuiteLoadingRootComponent, {
      environmentInjector: appRef.injector
    });

    appRef.attachView(this.rootComponentRef.hostView);

    const { location } = this.rootComponentRef;
    document.body.appendChild(location.nativeElement);
  }

  start(text: string = '') {
    const { rootComponentRef: { instance } } = this;
    instance.start(text);
  }

  stop() {
    const { rootComponentRef: { instance } } = this;
    instance.stop();
  }

}

Registry.add(NGSuiteLoading);
