import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import { ButtonColors } from 'src/components/Piano'
import { Button } from 'src/services/OctaveService'
import { PianoButton, PianoButtonProps } from './PianoButton'

const BUTTON_FIXTURE: Button = {
  name: 'button name',
  color: ButtonColors.Dark
}

const PROPS_FIXTURE: PianoButtonProps = {
  button: BUTTON_FIXTURE,
  onPress: () => {},
  onRelease: () => {},
  keyboardKey: 'space'
}

describe('integration: PianoButton component', () => {
  it('should render with dark color', () => {
    // Arrange
    const text = 'SPACE'
    render(
      <PianoButton
        {...PROPS_FIXTURE}
        button={{
          ...BUTTON_FIXTURE,
          color: ButtonColors.Dark
        }}
      />
    )

    // Actual
    const element = screen.getByText(text)

    // Assert
    expect(element).toBeInTheDocument()
    expect(element.textContent).toEqual(text)
    expect(element.tagName).toEqual('SPAN')
    expect(element.parentElement.tagName).toEqual('BUTTON')
    expect(element.parentElement.className).toEqual('button dark')
  })

  it('should render with light color', () => {
    // Arrange
    const text = 'SPACE'
    render(
      <PianoButton
        {...PROPS_FIXTURE}
        button={{
          ...BUTTON_FIXTURE,
          color: ButtonColors.Light
        }}
      />
    )

    // Actual
    const element = screen.getByText(text)

    // Assert
    expect(element).toBeInTheDocument()
    expect(element.textContent).toEqual(text)
    expect(element.tagName).toEqual('SPAN')
    expect(element.parentElement.tagName).toEqual('BUTTON')
    expect(element.parentElement.className).toEqual('button')
  })

  it('should trigger onPress and onRelease', () => {
    // Arrange
    const key = 'x'
    const onPress = jest.fn(() => {})
    const onRelease = jest.fn(() => {})

    render(<PianoButton {...PROPS_FIXTURE} onPress={onPress} onRelease={onRelease} keyboardKey={key} />)

    // Actual
    const element = screen.getByText(key.toUpperCase())

    fireEvent(
      element,
      new KeyboardEvent('keydown', {
        key,
        bubbles: true,
        cancelable: true
      })
    )

    fireEvent(
      element,
      new KeyboardEvent('keyup', {
        key,
        bubbles: true,
        cancelable: true
      })
    )

    // Assert
    expect(onPress).toHaveBeenCalledTimes(1)
    expect(onRelease).toHaveBeenCalledTimes(1)
  })

  it('should change highlight when onPress and onRelease', () => {
    // Arrange
    const key = 'x'
    const onPress = jest.fn(() => {})
    const onRelease = jest.fn(() => {})

    render(
      <PianoButton {...PROPS_FIXTURE} onPress={onPress} onRelease={onRelease} keyboardKey={key} highlight={false} />
    )

    // Actual
    const element = screen.getByText(key.toUpperCase())
    const classNameBeforeKeydown = element.parentElement.className

    fireEvent(
      element,
      new KeyboardEvent('keydown', {
        key,
        bubbles: true,
        cancelable: true
      })
    )

    const classNameAfterKeydown = element.parentElement.className

    fireEvent(
      element,
      new KeyboardEvent('keyup', {
        key,
        bubbles: true,
        cancelable: true
      })
    )

    const classNameAfterKeyup = element.parentElement.className

    // Assert
    expect(onPress).toHaveBeenCalledTimes(1)
    expect(onRelease).toHaveBeenCalledTimes(1)
    expect(classNameBeforeKeydown).toEqual('button dark')
    expect(classNameAfterKeydown).toEqual('button dark highlight')
    expect(classNameAfterKeyup).toEqual('button dark')
  })
})
