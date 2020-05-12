import TuneEnum from '../enums/tune.enum'
import IOctave from '../interfaces/octave.interface'
import IButton from '../interfaces/button.interface'
import ButtonColorEnum from '../enums/button.color.enum'

export default class OctaveHelper {
  tunes: TuneEnum[]
  octaves: IOctave[]

  constructor() {
    this.tunes = this.getTunes()
    this.octaves = this.getOctaves()
  }

  getOctaves = () => {
    let octaves: IOctave[] = []
    for (let i = 0; i <= 8; i++) {
      let buttons = this.generateOctaveFor(i)

      octaves.push({
        index: i,
        buttons,
      })
    }

    return octaves
  }

  getTunes = () => {
    return [
      TuneEnum.C,
      TuneEnum.CSharp,
      TuneEnum.D,
      TuneEnum.DSharp,
      TuneEnum.E,
      TuneEnum.F,
      TuneEnum.FSharp,
      TuneEnum.G,
      TuneEnum.GSharp,
      TuneEnum.A,
      TuneEnum.ASharp,
      TuneEnum.B,
    ]
  }

  getTunesBy = (startTune: TuneEnum, count = 11) => {
    if (count === this.tunes.length && startTune === TuneEnum.C) {
      return this.tunes
    }

    const tuneIndex = this.tunes.findIndex(tune => tune === startTune)
    return [...this.tunes].splice(tuneIndex, count)
  }

  isSharpTune = (tune: TuneEnum) => {
    switch (tune) {
      case TuneEnum.ASharp:
      case TuneEnum.CSharp:
      case TuneEnum.DSharp:
      case TuneEnum.FSharp:
      case TuneEnum.GSharp:
        return true
      default:
        return false
    }
  }

  generateOctaveFor = (octaveNumber: number): IButton[] => {
    let startTune = TuneEnum.C
    let count = this.tunes.length

    switch (octaveNumber) {
      case 0:
        startTune = TuneEnum.A
        count = 3
        break
      case 8:
        startTune = TuneEnum.C
        count = 1
        break
    }

    return this.getTunesBy(startTune, count).map(tune => {
      return {
        name: `${tune}${octaveNumber}`,
        color: this.isSharpTune(tune) ? ButtonColorEnum.black : ButtonColorEnum.white,
      }
    })
  }
}
