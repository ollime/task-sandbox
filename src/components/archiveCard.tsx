'use client'
import { useEffect, useState } from 'react'
import Draggable from './Draggable'
import { Coordinates } from '@dnd-kit/core/dist/types'

import ContextMenu from './ContextMenu'
import { useContextMenu } from '@/contexts/ContextMenuProvider'
import { CardData, colorPreset, sizePreset } from '../types/card.types'

interface CardProps {
  size: Coordinates
  label: string
  color?: string
  cardId: string
  rotation?: boolean
}

export default function ArchiveCard({
  label,
  color,
  size,
  cardId,
  rotation,
}: CardProps) {
  const [cardLabel, setCardLabel] = useState<string>(label)
  const [cardSize, setCardSize] = useState<Coordinates>(size)
  const [cardColor, setCardColor] = useState<string>(color ?? colorPreset.blue)
  const [cardRotation, setCardRotation] = useState<boolean>(rotation ?? false)

  return (
    <div>
      <div
        id={cardLabel}
        className="flex flex-1 items-center justify-center select-none"
        style={{
          height: cardRotation ? cardSize.x : cardSize.y,
          width: cardRotation ? cardSize.y : cardSize.x,
          backgroundColor: cardColor,
        }}>
        {cardLabel}
      </div>
    </div>
  )
}
