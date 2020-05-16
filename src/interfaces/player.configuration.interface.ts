import ITuneConfiguration from './tune.configuration.interface'

export default interface IPlayerConfiguration {
  loop: boolean
  timeout: number
  count: number
  tunes: ITuneConfiguration[]
}
