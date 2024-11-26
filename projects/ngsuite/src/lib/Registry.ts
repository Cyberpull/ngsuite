import { EnvironmentProviders, makeEnvironmentProviders, Provider } from '@angular/core'

type ProviderLike = Provider | EnvironmentProviders;

const entries: ProviderLike[] = [];

class ProviderRegistry {

  add(entry: ProviderLike) {
    entries.push(entry);
  }

  entries(more?: ProviderLike[]): ProviderLike[] {
    return (more || []).concat(entries);
  }

  toEnvironmentProviders(more?: ProviderLike[]): EnvironmentProviders {
    return makeEnvironmentProviders(this.entries(more));
  }

}

export const Registry = new ProviderRegistry();
