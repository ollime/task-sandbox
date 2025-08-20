'use client'
import { useEffect, useState } from 'react'
import { Coordinates } from '@dnd-kit/core/dist/types'

import { CardData, colorPreset, sizePreset } from '../types/card.types'
import { useStyles } from '@/contexts/StylesProvider'

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
  const [hover, setHover] = useState<boolean>(false)
  const { cardShape } = useStyles()

  return (
    <div
      onMouseEnter={() => {
        setHover(true)
      }}
      onMouseLeave={() => {
        setHover(false)
      }}
      className="flex flex-row space-x-2">
      <div
        id={cardLabel}
        className="flex flex-1 items-center justify-center select-none"
        style={{
          height: cardRotation ? cardSize.x : cardSize.y,
          width: cardRotation ? cardSize.y : cardSize.x,
          borderRadius: cardShape === 'rounded' ? 8 : 0,
          backgroundColor: cardColor,
        }}>
        {cardLabel}
      </div>
      <div
        style={{
          visibility: hover ? 'visible' : 'hidden',
        }}>
        jsdlfjd
      </div>
    </div>
  )
}
