import { ButtonColors } from '../../components/Piano'
import { Button } from '../OctaveService/OctaveService.types'

export const isDarkButton = (button: Button): boolean => {
  return button.color === ButtonColors.Dark
}

export const getKeyboardKeyHandler = () => {
  const keys = {
    black: ['=', '0', '9', '7', '6', '5', '3', '2'],
    white: [']', '[', 'p', 'o', 'i', 'u', 'y', 't', 'r', 'e', 'w', 'q']
  }

  return (button: Button): string => {
    if (isDarkButton(button)) {
      return keys.black.pop()
    }

    return keys.white.pop()
  }
}
