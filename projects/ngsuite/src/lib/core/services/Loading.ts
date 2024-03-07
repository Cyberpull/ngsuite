import { ApplicationRef, ComponentRef, createComponent, createEnvironmentInjector, Injectable } from "@angular/core";
import { NGSuiteLoadingRootComponent } from "../components";
import { Registry } from "../Registry";

@Injectable()
export class NGSuiteLoading {

  private rootComponentRef: ComponentRef<NGSuiteLoadingRootComponent>;

  constructor(
    private appRef: ApplicationRef
  ) {
    const injector = createEnvironmentInjector([], appRef.injector);

    this.rootComponentRef = createComponent(NGSuiteLoadingRootComponent, {
      environmentInjector: injector
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
