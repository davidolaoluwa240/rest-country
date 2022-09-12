export interface Callback {
  (...data: any[]): Promise<void>;
}

export interface ErrorCallback {
  (message: string): void;
}
