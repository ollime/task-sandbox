import { LabelData } from '@/types/label.types'
import { useState } from 'react'

export default function Label({ label, position }: LabelData) {
  const [isEditable, setIsEditable] = useState<boolean>(false)
  const [text, setText] = useState<string>(label ?? '')

  function handleToggleEdit() {
    setIsEditable(!isEditable)
  }

  function handleEditText(value: string) {
    setText(value)
  }

  return (
    <div>
      {isEditable ? (
        <input
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
          className="text-lg hover:cursor-pointer"
          onDoubleClick={handleToggleEdit}>
          {text}
        </p>
      )}
    </div>
  )
}
