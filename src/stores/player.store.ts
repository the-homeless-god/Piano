import { Writable, writable } from 'svelte/store'
import IPlayerConfiguration from '../interfaces/player.configuration.interface'

export const playerConfiguration: Writable<IPlayerConfiguration> = writable({
  loop: false,
  timeout: 500,
  count: 0,
  tunes: [],
})
