import React, { useCallback, useState } from 'react'
import cx from 'classnames'

import { Button } from 'src/services/OctaveService'
import { isDarkButton } from 'src/services/KeyboardService'

import css from './PianoButton.module.scss'

export type PianoButtonProps = {
  button: Button
  highlight?: boolean
  onPress: () => void
  onRelease: () => void
  keyboardKey: string
}

export const PianoButton: React.FC<PianoButtonProps> = ({ button, onPress, onRelease, keyboardKey, highlight }) => {
  const [isHighlight, setIsHighlight] = useState<boolean>(!!highlight)

  const onReleaseTrigger = useCallback(() => {
    setIsHighlight(false)
    onRelease()
  }, [setIsHighlight, onRelease])

  const onPressTrigger = useCallback(() => {
    setIsHighlight(true)
    onPress()
  }, [setIsHighlight, onPress])

  const isEventKey = useCallback((event: KeyboardEvent) => event.key.toLowerCase() === keyboardKey, [keyboardKey])

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!event.repeat && isEventKey(event)) {
        onPressTrigger()
      }
    },
    [onPressTrigger, isEventKey]
  )

  const onKeyUp = useCallback(
    (event: KeyboardEvent) => {
      if (!event.repeat && isEventKey(event)) {
        onReleaseTrigger()
      }
    },
    [onReleaseTrigger, isEventKey]
  )

  window.addEventListener('keydown', onKeyDown)
  window.addEventListener('keyup', onKeyUp)

  return (
    <button
      type="button"
      key={button.name}
      className={cx(css.button, isDarkButton(button) && css.dark, isHighlight && css.highlight)}
      onMouseLeave={onReleaseTrigger}
      onMouseDown={onPressTrigger}
      onMouseUp={onReleaseTrigger}
    >
      <span className={css.text}>{keyboardKey.toUpperCase()}</span>
    </button>
  )
}
