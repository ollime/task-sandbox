import { useState } from 'react'
import { ColorKeys, colorPreset, sizePreset } from '../utils/card.types'
import { Coordinates } from '@dnd-kit/core/dist/types'

interface ContextMenuProps {
  top: number
  left: number
  currentSize?: string
  setCardSize: (size: Coordinates) => void
  currentColor: string
  setCardColor: (color: string) => void
  rotate: boolean
  setRotate: (value: boolean) => void
}

export default function ContextMenu({
  top,
  left,
  currentSize,
  setCardSize,
  currentColor,
  setCardColor,
  rotate,
  setRotate,
}: ContextMenuProps) {
  const [size, setSize] = useState<string | undefined>(currentSize ?? undefined)
  const liStyles = 'p-2 hover:cursor-pointer hover:bg-black'
  const radioStyles = 'm-1 mr-2 scale-160'
  const radioButtonStyles =
    'hover:bg-neutral-400 hover:text-white rounded-lg px-2 py-1 hover:cursor-pointer'
  const styles: React.CSSProperties = {
    position: 'absolute',
    minWidth: '250px',
    backgroundColor: '#383838',
    top: top,
    left: left,
    zIndex: 1000,
  }

  /** Size buttons */
  const radioBtns: React.ReactNode = Object.keys(sizePreset).map((item) => (
    <div
      key={item}
      onClick={() => handleUpdateSize(item)}
      className={`${radioButtonStyles} ${item === size ? 'bg-white text-black' : 'bg-neutral-500'} m-1 flex flex-row`}>
      {isValidSizeKey(item) ? sizePreset[item].label : item}
    </div>
  ))

  /** Color buttons */
  const colorBtns: React.ReactNode = (
    Object.keys(colorPreset) as ColorKeys[]
  ).map((item) => (
    <div key={item} className="inline-block flex-row">
      <input
        type="radio"
        name="color"
        id={item}
        defaultChecked={colorPreset[item] === currentColor}
        className={`${radioStyles} hover:cursor-pointer`}
        value={colorPreset[item]}
        style={{
          accentColor: colorPreset[item],
        }}
        title={item}
        onClick={() => handleUpdateColor(item)}
      />
    </div>
  ))

  function isValidSizeKey(key: string): key is keyof typeof sizePreset {
    return key in sizePreset
  }

  function handleUpdateColor(newColor: ColorKeys) {
    setCardColor(colorPreset[newColor])
  }

  function handleUpdateSize(newSize: string) {
    if (isValidSizeKey(newSize)) {
      setCardSize(sizePreset[newSize])
      setSize(newSize)
    }
  }

  function handleRotateCard() {
    setRotate(!rotate)
  }

  return (
    <div style={styles} className="rounded-lg" role="menu">
      <ul role="menu">
        <li className={`rounded-t-lg p-2 hover:bg-black`} role="menuitem">
          <div className="m-2 mt-0 flex flex-row justify-between">
            <p>Size</p>
            <p className="hover:cursor-pointer" onClick={handleRotateCard}>
              Rotate
            </p>
          </div>
          <div className="align-center flex flex-row flex-wrap">
            {radioBtns}
          </div>
        </li>
        <li className={`p-2 hover:bg-black`} role="menuitem">
          <p className="mb-2">Color</p>
          {colorBtns}
        </li>
        <li className={liStyles} role="menuitem">
          Rename
        </li>
        <li className={liStyles} role="menuitem">
          Delete
        </li>
        <li className={`${liStyles} rounded-b-lg`} role="menuitem">
          Archive
        </li>
      </ul>
    </div>
  )
}
