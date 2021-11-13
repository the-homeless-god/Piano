import { ButtonColors, Tunes } from '../../components/Piano'
import { Button, Octave, OctaveConfig } from './OctaveService.types'

export default class OctaveService {
  tunes: Tunes[]

  octaves: Octave[]

  startOctave: number = 3

  endOctave: number = 4

  constructor() {
    this.tunes = this.getTunes()
    this.octaves = this.getOctaves()
  }

  getOctaves = () => {
    const octaves: Octave[] = []

    // eslint-disable-next-line no-plusplus
    for (let i = this.startOctave; i <= this.endOctave; i++) {
      const buttons = this.generateOctaveFor(i)
      octaves.push({
        index: i,
        buttons
      })
    }

    return octaves
  }

  getTunes = () => {
    return [
      Tunes.C,
      Tunes.CSharp,
      Tunes.D,
      Tunes.DSharp,
      Tunes.E,
      Tunes.F,
      Tunes.FSharp,
      Tunes.G,
      Tunes.GSharp,
      Tunes.A,
      Tunes.ASharp,
      Tunes.B
    ]
  }

  getTunesBy = ({ startTune, count = 11 }: OctaveConfig) => {
    if (count === this.tunes.length && startTune === Tunes.C) {
      return this.tunes
    }

    const tuneIndex = this.tunes.findIndex(tune => tune === startTune)
    return [...this.tunes].splice(tuneIndex, count)
  }

  isSharpTune = (tune: Tunes) => {
    switch (tune) {
      case Tunes.ASharp:
      case Tunes.CSharp:
      case Tunes.DSharp:
      case Tunes.FSharp:
      case Tunes.GSharp:
        return true
      default:
        return false
    }
  }

  getOctaveConfig(octaveNumber: number): OctaveConfig {
    switch (octaveNumber) {
      case 0:
        return { startTune: Tunes.A, count: 3 }

      case 4:
        return { startTune: Tunes.C, count: 8 }

      case 8:
        return { startTune: Tunes.C, count: 1 }

      default:
        return { startTune: Tunes.C, count: this.tunes.length }
    }
  }

  generateOctaveFor = (octaveNumber: number): Button[] => {
    const config = this.getOctaveConfig(octaveNumber)
    return this.getTunesBy(config).map(tune => {
      return {
        name: `${tune}${octaveNumber}`,
        color: this.isSharpTune(tune) ? ButtonColors.Dark : ButtonColors.Light
      }
    })
  }
}
