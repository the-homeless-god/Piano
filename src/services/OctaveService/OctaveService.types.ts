import { ButtonColors, Tunes } from 'src/components/Piano'

export type Button = {
  name: string
  color: ButtonColors
}

export type Octave = {
  index: number
  buttons: Button[]
}

export type Tune = {
  name: string
  measure: number
  duration: number
}

export type OctaveConfig = {
  startTune: Tunes
  count: number
}
