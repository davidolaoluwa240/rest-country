// Callback Interface
export interface Callback {
  (...data: any[]): Promise<void>;
}

// Error Callback Interface
export interface ErrorCallback {
  (message: string): void;
}
