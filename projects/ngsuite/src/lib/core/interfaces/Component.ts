export interface NGSuiteComponent<T = any> {
  new (...args: any[]): T;
}
