import { TaskPayload } from './TaskService.types'

// Helper function for 'fake' tasks
// Returned Promise is wrapped! (tasks should not run right after initialization)
export const createTask =
  ({ delay, callback }: TaskPayload) =>
  () =>
    new Promise(resolve =>
      setTimeout(() => {
        resolve(callback())
      }, delay)
    )
