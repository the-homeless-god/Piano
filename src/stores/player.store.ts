import { Writable, writable } from 'svelte/store'
import IPlayerConfiguration from '../interfaces/player.configuration.interface'

export const playerConfiguration: Writable<IPlayerConfiguration> = writable({
  loop: false,
  timeout: 500,
  count: 4,
  tunes: [
    { enabled: false, value: 'G3' },
    { enabled: false, value: 'D#3' },
    { enabled: false, value: 'D3' },
    { enabled: false, value: 'C3' },
  ],
})
