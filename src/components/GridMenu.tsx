import { useState } from 'react'
import { cardShapeType, gridSizeType, gridSizes } from '@/utils/grid.types'
import { CardData, colorPreset } from '@/utils/card.types'
import { useStyles } from '@/utils/StylesProvider'

interface ContextMenuProps {
  top: number
  left: number
  gridSpacing?: gridSizeType
  setGridSpacing: (size: gridSizeType) => void
  addNewCard: (data: CardData) => void
  cardCount: number
  setClicked: (value: string) => void // to close the menu
}

export default function GridMenu({
  top,
  left,
  gridSpacing,
  setGridSpacing,
  addNewCard,
  cardCount,
  setClicked,
}: ContextMenuProps) {
  const { cardShape, setCardShape } = useStyles()
  const [size, setSize] = useState<gridSizeType | undefined>(
    gridSpacing ?? undefined
  )
  const [shape, setShape] = useState<cardShapeType | undefined>(cardShape)

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

  /** grid spacing size buttons */
  const spacingBtns: React.ReactNode = gridSizes.map((item) => (
    <div
      key={item}
      onClick={() => handleUpdateSize(item as gridSizeType)}
      className={`${radioButtonStyles} ${item === size ? 'bg-white text-black' : 'bg-neutral-500'} m-1 flex flex-row`}>
      {item}
    </div>
  ))

  /** card shape buttons */
  const shapeBtns: React.ReactNode = (
    <>
      <div
        onClick={() => handleUpdateShape('sharp')}
        className={`${radioButtonStyles} ${'sharp' === shape ? 'bg-white text-black' : 'bg-neutral-500'} m-1 flex flex-row`}>
        Sharp
      </div>
      <div
        onClick={() => handleUpdateShape('rounded')}
        className={`${radioButtonStyles} ${'rounded' === shape ? 'bg-white text-black' : 'bg-neutral-500'} m-1 flex flex-row`}>
        Rounded
      </div>
    </>
  )

  function handleUpdateSize(newSize: gridSizeType) {
    setGridSpacing(newSize)
    setSize(newSize)
  }

  function handleUpdateShape(newShape: cardShapeType) {
    setCardShape(newShape)
    setShape(newShape)
  }

  function handleAddCard() {
    const newTask: CardData = {
      label: 'card ' + cardCount,
      color: colorPreset.gray,
      size: 'smRect',
      position: { x: 0, y: 0 },
      rotated: false,
    }
    addNewCard(newTask)
    setClicked('')
  }

  return (
    <div style={styles} className="rounded-lg" role="menu">
      <ul role="menu">
        <div className="p-2 text-center font-bold">Grid settings</div>
        <li className={`p-2 hover:bg-black`} role="menuitem">
          <p className="mb-2">Grid size</p>
          <div className="align-center flex flex-row flex-wrap">
            {spacingBtns}
          </div>
        </li>
        <li className={`p-2 hover:bg-black`} role="menuitem">
          <p className="mb-2">Card shape</p>
          <div className="align-center flex flex-row flex-wrap">
            {shapeBtns}
          </div>
        </li>
        <li className={liStyles} role="menuitem" onClick={handleAddCard}>
          New card
        </li>
        <li className={`${liStyles} rounded-b-lg`} role="menuitem">
          Add label
        </li>
      </ul>
    </div>
  )
}
