import { useState } from 'react'
import { cardShapeType, gridSizeType, gridSizes } from '@/types/grid.types'
import { CardData, colorPreset } from '@/types/card.types'
import { useStyles } from '@/contexts/StylesProvider'
import { LabelData } from '@/types/label.types'

interface ContextMenuProps {
  top: number
  left: number
  gridSpacing?: gridSizeType
  setGridSpacing: (size: gridSizeType) => void
  addNewCard: (data: CardData) => void
  cardCount: number
  setClicked: (value: string) => void // to close the menu
  addNewLabel: (data: LabelData) => void
  labelCount: number
}

export default function GridMenu({
  top,
  left,
  gridSpacing,
  setGridSpacing,
  addNewCard,
  cardCount,
  setClicked,
  addNewLabel,
  labelCount,
}: ContextMenuProps) {
  const { cardShape, setCardShape, isDarkMode, setIsDarkMode } = useStyles()
  const [size, setSize] = useState<gridSizeType | undefined>(
    gridSpacing ?? undefined
  )
  const [shape, setShape] = useState<cardShapeType | undefined>(cardShape)

  const liStyles = 'p-2 hover:cursor-pointer hover:bg-black'
  const radioButtonStyles =
    'hover:bg-neutral-400 hover:text-white rounded-lg px-2 py-1 hover:cursor-pointer'
  const styles: React.CSSProperties = {
    position: 'absolute',
    minWidth: '250px',
    top: top,
    left: left,
    zIndex: 1000,
  }

  /** grid spacing size buttons */
  const spacingBtns: React.ReactNode = gridSizes.map((item) => (
    <div
      key={item}
      onClick={() => handleUpdateSize(item as gridSizeType)}
      className={`${radioButtonStyles} ${item === size ? 'bg-white text-black' : 'bg-button'} m-1 flex flex-row`}>
      {item}
    </div>
  ))

  /** dark mode buttons */
  const darkModeBtns: React.ReactNode = (
    <>
      <div
        onClick={() => setIsDarkMode(true)}
        className={`${radioButtonStyles} ${isDarkMode ? 'bg-white text-black' : 'bg-button'} m-1 flex flex-row`}>
        Dark
      </div>
      <div
        onClick={() => setIsDarkMode(false)}
        className={`${radioButtonStyles} ${!isDarkMode ? 'bg-white text-black' : 'bg-button'} m-1 flex flex-row`}>
        Light
      </div>
    </>
  )

  /** card shape buttons */
  const shapeBtns: React.ReactNode = (
    <>
      <div
        onClick={() => handleUpdateShape('sharp')}
        className={`${radioButtonStyles} ${'sharp' === shape ? 'bg-white text-black' : 'bg-button'} m-1 flex flex-row`}>
        Sharp
      </div>
      <div
        onClick={() => handleUpdateShape('rounded')}
        className={`${radioButtonStyles} ${'rounded' === shape ? 'bg-white text-black' : 'bg-button'} m-1 flex flex-row`}>
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
      striped: false,
    }
    addNewCard(newTask)
    setClicked('')
  }

  function handleAddLabel() {
    const newLabel: LabelData = {
      label: '',
      position: { x: 0, y: 0 },
      _id: String(labelCount + 1),
    }
    addNewLabel(newLabel)
    setClicked('')
  }

  return (
    <div style={styles} className="bg-context rounded-lg" role="menu">
      <ul role="menu">
        <div className="p-2 text-center font-bold">Grid settings</div>
        <li
          className={`hover:text-hoverText p-2 hover:bg-black`}
          role="menuitem">
          <p className="mb-2">Grid size</p>
          <div className="align-center flex flex-row flex-wrap">
            {spacingBtns}
          </div>
        </li>
        <li
          className={`hover:text-hoverText flex flex-row items-center p-2 hover:bg-black`}
          role="menuitem">
          <p className="mr-2 mb-2">Card shape</p>
          <div className="align-center flex flex-row flex-wrap">
            {shapeBtns}
          </div>
        </li>
        <li
          className={`hover:text-hoverText flex flex-row items-center p-2 hover:bg-black`}
          role="menuitem">
          <p className="mr-2 mb-2">Dark mode</p>
          <div className="align-center flex flex-row flex-wrap">
            {darkModeBtns}
          </div>
        </li>
        <li
          className={`${liStyles} hover:text-hoverText`}
          role="menuitem"
          onClick={handleAddCard}>
          New card
        </li>
        <li
          className={`${liStyles} hover:text-hoverText rounded-b-lg`}
          role="menuitem"
          onClick={handleAddLabel}>
          Add label
        </li>
      </ul>
    </div>
  )
}
