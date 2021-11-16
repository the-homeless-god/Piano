import { QueueItem } from './Queue.types'

export class AutoQueue<T> {
  hasPromise: boolean

  items: QueueItem<T>[]

  get size() {
    return this.items.length
  }

  constructor() {
    this.items = []

    this.hasPromise = false
  }

  enqueue({ action }: QueueItem<T>): Promise<void> {
    return new Promise((resolve, reject) => {
      this.items.push({ action, resolve, reject })
      this.dequeue()
    })
  }

  async dequeue(): Promise<QueueItem<T>> {
    if (this.hasPromise) return null

    const item = this.items.shift()

    if (!item) return null

    try {
      this.hasPromise = true

      const payload = await item.action(this)
      this.hasPromise = false
      item.resolve?.(payload)
    } catch (e) {
      this.hasPromise = false
      item.reject?.(e)
    } finally {
      this.dequeue()
    }

    return item
  }
}
