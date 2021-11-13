import { Tune } from '../../../services/OctaveService'

export const parseXmlTunes = (xml: Document): Tune[] =>
  Array.from(xml.querySelectorAll('note').entries()).map(item => {
    const measure = parseInt(
      // eslint-disable-next-line dot-notation
      (item?.[1].parentNode as HTMLElement).attributes['number'].textContent || '0',
      10
    )
    const octave = item?.[1].querySelector('octave')?.textContent || ''
    const step = item?.[1].querySelector('step')?.textContent || ''
    const duration = parseInt(item?.[1].querySelector('duration')?.textContent || '0', 10) / 100
    const name = `${step}${octave}`

    return { name, duration, measure }
  })
