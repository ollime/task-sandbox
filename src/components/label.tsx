import { useState } from 'react'

import { LabelData } from '@/types/label.types'
import Draggable from './Draggable'

export default function Label({ label, position, _id }: LabelData) {
  const [isEditable, setIsEditable] = useState<boolean>(false)
  const [text, setText] = useState<string>(label ?? '')

  function handleToggleEdit() {
    setIsEditable(!isEditable)
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
          autoFocus={true}
          onKeyDown={(evt) => {
            if (evt.key === 'Enter') {
              evt.preventDefault()
              setIsEditable(false)
            }
          }}
        />
      ) : (
        <p
          id={_id + '-label'}
          className="text-lg hover:cursor-pointer"
          onDoubleClick={handleToggleEdit}>
          {text}
        </p>
      )}
    </Draggable>
  )
}
