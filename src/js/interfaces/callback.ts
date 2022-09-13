export interface Callback {
  (): Promise<void>;
}

export interface ErrorCallback {
  (message: string): void;
}
