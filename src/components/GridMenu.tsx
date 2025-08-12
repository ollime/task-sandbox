import { useState } from 'react'
import { gridSizeType, gridSizes } from '@/utils/grid.types'

interface ContextMenuProps {
  top: number
  left: number
  gridSpacing?: gridSizeType
  setGridSpacing: (size: gridSizeType) => void
}

export default function GridMenu({
  top,
  left,
  gridSpacing,
  setGridSpacing,
}: ContextMenuProps) {
  const [size, setSize] = useState<gridSizeType | undefined>(
    gridSpacing ?? undefined
  )
  const liStyles = 'p-2 hover:cursor-pointer hover:bg-black'
  const radioStyles = 'm-1 mr-2 scale-160'
  const radioButtonStyles =
    'hover:bg-neutral-400 bg-neutral-500 rounded-lg px-2 py-1 hover:cursor-pointer'
  const styles: React.CSSProperties = {
    position: 'absolute',
    minWidth: '250px',
    backgroundColor: '#383838',
    top: top,
    left: left,
    zIndex: 1000,
  }

  /** Size buttons */
  const radioBtns: React.ReactNode = gridSizes.map((item) => (
    <div
      key={item}
      className="my-1 flex flex-row"
      onClick={() => handleUpdateSize(item as gridSizeType)}>
      <input
        type="radio"
        name="size"
        id={'size-' + item}
        value={item}
        defaultChecked={item === size}
        className={`${radioStyles} appearance-none`}
      />
      <label htmlFor={'size-' + item} className={radioButtonStyles}>
        {item}
      </label>
    </div>
  ))

  function handleUpdateSize(newSize: gridSizeType) {
    setGridSpacing(newSize)
    setSize(newSize)
  }

  return (
    <div style={styles} className="rounded-lg" role="menu">
      <ul role="menu">
        <li className={`rounded-t-lg p-2 hover:bg-black`} role="menuitem">
          <p className="mb-2">Grid size</p>
          <div className="align-center flex flex-row flex-wrap">
            {radioBtns}
          </div>
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
