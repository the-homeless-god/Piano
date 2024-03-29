import React from 'react'
import * as Tone from 'tone'

import { Display } from 'src/components/Display'
import OctaveService from 'src/services/OctaveService'
import { getKeyboardKeyHandler } from 'src/services/KeyboardService'

import { PianoButton } from './PianoButton'
import css from './Piano.module.scss'

export const Piano = () => {
  const synth = new Tone.PolySynth(Tone.Synth).toDestination()

  const { octaves } = new OctaveService()
  const handleKey = getKeyboardKeyHandler()

  return (
    <>
      <Display />

      <div className={css.octaves}>
        {octaves.map(octave => (
          <div className={css.octave} key={octave.index}>
            {octave.buttons.map(button => {
              return (
                <PianoButton
                  keyboardKey={handleKey(button) || ''}
                  key={button.name}
                  button={button}
                  onPress={() => synth.triggerAttack(button.name)}
                  onRelease={() => synth.triggerRelease(button.name)}
                />
              )
            })}
          </div>
        ))}
      </div>
    </>
  )
}
