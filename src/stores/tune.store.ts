import { Writable, writable } from 'svelte/store'

export const clickedTune: Writable<string> = writable('')
