import { Provider } from '@angular/core'

const entries: Provider[] = [];

class ProviderRegistry {

  add(entry: Provider) {
    entries.push(entry);
  }

  entries(more?: Provider[]): Provider[] {
    return (more || []).concat(entries);
  }

}

export const Registry = new ProviderRegistry();
