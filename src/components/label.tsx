import { useState, useEffect } from 'react'

import { LabelData } from '@/types/label.types'
import Draggable from './Draggable'
import { useContextMenu } from '@/contexts/ContextMenuProvider'
import { Coordinates } from '@dnd-kit/core/dist/types'

interface LabelPropsType {
  label: string
  position: Coordinates
  _id: string
  deleteLabel: (_id: string) => void
  sendLabel: (data: LabelData) => void
}

export default function Label({
  label,
  position,
  _id,
  deleteLabel,
  sendLabel,
}: LabelPropsType) {
  const { setClicked } = useContextMenu()
  const [isEditable, setIsEditable] = useState<boolean>(false)
  const [text, setText] = useState<string>(label ?? '')

  useEffect(() => {
    if (label === '') {
      setIsEditable(true)
    }
  }, [])

  function handleToggleEdit() {
    setIsEditable(!isEditable)
    sendLabel({ label: text, position, _id })
    if (!isEditable) {
      setClicked('')
    }
    if (text.length === 0) {
      deleteLabel(_id)
    }
  }

  function handleEditText(value: string) {
    setText(value)
  }

  return (
    <Draggable
      id={_id + '-label'}
      position={position}
      color={'transparent'}
      isActive={true}
      draggable={!isEditable}>
      {isEditable ? (
        <input
          id={_id + '-label'}
          type="text"
          value={text}
          onChange={(evt) => {
            handleEditText(evt.target.value)
          }}
          onBlur={() => handleToggleEdit}
          autoFocus={true}
          onKeyDown={(evt) => {
            if (evt.key === 'Enter') {
              evt.preventDefault()
              handleToggleEdit()
            }
          }}
        />
      ) : (
        <p
          id={_id + '-label'}
          className="text-lg hover:cursor-move"
          onDoubleClick={handleToggleEdit}
          onContextMenu={handleToggleEdit}>
          {text}
        </p>
      )}
    </Draggable>
  )
}
