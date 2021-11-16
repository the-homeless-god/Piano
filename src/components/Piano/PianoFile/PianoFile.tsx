import React, { useCallback, useEffect, useState } from 'react'
import * as Tone from 'tone'
import { Tune } from 'src/services/OctaveService'
import { AutoQueue, createTask } from 'src/services/TaskService'

import { parseXmlTunes } from './PianoFile.utils'

export type PianoFileProps = {}

export const PianoFile: React.FC<PianoFileProps> = () => {
  const [file, setFile] = useState<File | null>(null)
  const [tunes, setTunes] = useState<Tune[]>([])

  const onFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFile(null)
      setTunes([])
      setFile(event.target.files?.[0] || null)
    },
    [setFile]
  )

  const synth = new Tone.Synth().toDestination()

  const aQueue = new AutoQueue()

  const onPlay = (tune: Tune) => {
    synth.triggerAttackRelease(tune.name, tune.duration)
  }

  useEffect(() => {
    if (file && !tunes.length) {
      file.text().then(text => {
        const xml = new window.DOMParser().parseFromString(text, 'text/xml')
        const fileTunes = parseXmlTunes(xml)
        setTunes(fileTunes)
      })
    }
  }, [file, setTunes, tunes])

  const onFilePlay = () => {
    if (tunes.length) {
      let previousMeasure = tunes[0].measure

      tunes.forEach(tune => {
        let timeout = 450
        if (tune.measure !== previousMeasure) {
          previousMeasure = tune.measure
          timeout = 750
        }

        const action = createTask({
          delay: timeout,
          callback: () => onPlay(tune)
        })
        aQueue.enqueue({ action })
      })
    }
  }

  return (
    <div>
      <input type="file" onChange={onFileChange} />
      <button type="button" onClick={onFilePlay}>
        play
      </button>
    </div>
  )
}
