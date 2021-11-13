import React from 'react'
import { PianoFile } from '../Piano'
import css from './Display.module.scss'

export type DisplayProps = {}

export const Display: React.FC<DisplayProps> = () => {
  return (
    <div className={css.display}>
      <div className={css.player}>
        <PianoFile />
      </div>
    </div>
  )
}
