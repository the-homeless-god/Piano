export type QueueItem<T> = {
  action: (..._args: unknown[]) => Promise<T>
  resolve?: (value: unknown) => void
  reject?: (reason?: any) => void
}
