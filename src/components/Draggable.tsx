'use client'
import React, { ReactNode } from 'react'
import { useDraggable } from '@dnd-kit/core'
import { Coordinates } from '@dnd-kit/core/dist/types'

import { useStyles } from '@/contexts/StylesProvider'
import { darkenHex } from '../utils/color'

type DraggableProps = {
  id: string
  children: ReactNode
  position: Coordinates
  color?: string
  isActive: boolean
  draggable?: boolean
}

export default function Draggable({
  id,
  children,
  position,
  color = '#0398fc',
  isActive,
  draggable = true,
}: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: id,
    })
  const { cardShape, setCardShape } = useStyles()

  const style: React.CSSProperties = {
    position: 'absolute',
    borderRadius: cardShape === 'rounded' ? 8 : 0,
    backgroundColor: isDragging ? darkenHex(color, 20) : color,
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    userSelect: 'none',
    cursor: draggable ? 'move' : 'default',
    top: position.y,
    left: position.x,
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    touchAction: 'none',
    zIndex: isActive ? 100 : 0,
  }

  return (
    <button
      ref={setNodeRef}
      style={style}
      {...(draggable ? listeners : {})}
      {...attributes}>
      {children}
    </button>
  )
}
