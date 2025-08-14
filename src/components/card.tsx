'use client'
import { useEffect, useState } from 'react'
import Draggable from './Draggable'
import { Coordinates } from '@dnd-kit/core/dist/types'

import ContextMenu from './ContextMenu'
import { useContextMenu } from '@/contexts/ContextMenuProvider'
import { CardData, colorPreset, sizePreset } from '../types/card.types'
import { Task } from '@mui/icons-material'

interface CardProps {
  position: Coordinates
  size: Coordinates
  label: string
  color?: string
  activeId: string
  setActiveId: (value: string) => void
  cardId: string
  rotation?: boolean
  deleteCard: (id: string) => void
}

export default function Card({
  position,
  label,
  color,
  activeId,
  size,
  setActiveId,
  cardId,
  rotation,
  deleteCard,
}: CardProps) {
  const [cardLabel, setCardLabel] = useState<string>(label)
  const [cardSize, setCardSize] = useState<Coordinates>(size)
  const [cardColor, setCardColor] = useState<string>(color ?? colorPreset.blue)
  const [cardRotation, setCardRotation] = useState<boolean>(rotation ?? false)
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const sizeString =
    Object.entries(sizePreset).find(([_, val]) => val === cardSize)?.[0] ?? ''

  const { clicked, setClicked, points, setPoints } = useContextMenu()
  function handleOpenMenu(evt: React.MouseEvent) {
    evt.preventDefault()
    setClicked(cardLabel)
    setIsMenuOpen(true)
    setPoints({
      x: evt.pageX - position.x - 50,
      y: evt.pageY - position.y - 50,
    })
    setActiveId(cardLabel)
  }

  useEffect(() => {
    if (isMenuOpen && clicked === '') {
      // update card if the menu was open but closed
      setIsMenuOpen(false)
      sendCardData({
        label: cardLabel,
        color: cardColor,
        size: sizeString,
        position,
        rotated: cardRotation,
        _id: cardId,
      })
    }
  }, [clicked])

  /** update card data */
  async function sendCardData(taskData: CardData) {
    try {
      await fetch(`/api/cards/${taskData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Draggable
      id={cardLabel}
      position={position}
      color={cardColor}
      isActive={cardLabel === activeId}
      draggable={!clicked}>
      <div
        id={cardLabel}
        className="flex flex-1 items-center justify-center"
        style={{
          height: cardRotation ? cardSize.x : cardSize.y,
          width: cardRotation ? cardSize.y : cardSize.x,
        }}
        onContextMenu={(evt) => handleOpenMenu(evt)}
        onDoubleClick={(evt) => handleOpenMenu(evt)}>
        {cardLabel}
      </div>
      {clicked === cardLabel ? (
        <ContextMenu
          top={points.y}
          left={points.x}
          currentSize={sizeString}
          setCardSize={setCardSize}
          currentColor={cardColor}
          setCardColor={setCardColor}
          rotate={cardRotation}
          setRotate={setCardRotation}
          _id={cardId}
          deleteCard={() => {
            deleteCard(cardId)
          }}
          cardLabel={cardLabel}
          setCardLabel={setCardLabel}></ContextMenu>
      ) : (
        ''
      )}
    </Draggable>
  )
}
