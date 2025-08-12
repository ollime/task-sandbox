import { Coordinates } from '@dnd-kit/core/dist/types'

export interface CardData {
  label: string
  color?: string
  size: string
  position: Coordinates
  _id?: string
  rotated?: boolean
}

export type SizeKeys =
  | 'smRect'
  | 'smSquare'
  | 'mdRect'
  | 'lgRect'
  | 'mdSquare'
  | 'lgSquare'

export const sizePreset = {
  smRect: { x: 150, y: 50, label: '1.5x0.5' },
  smSquare: { x: 100, y: 100, label: '1x1' },
  mdRect: { x: 200, y: 100, label: '2x1' },
  lgRect: { x: 300, y: 100, label: '3x1' },
  mdSquare: { x: 200, y: 200, label: '2x2' },
  lgSquare: { x: 300, y: 300, label: '3x3' },
}

export type ColorKeys =
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'purple'
  | 'pink'
  | 'gray'

export const colorPreset = {
  red: '#fb2c36',
  orange: '#ff6900',
  yellow: '#f0b100',
  green: '#00c950',
  blue: '#0084d1',
  purple: '#9810fa',
  pink: '#e60076',
  gray: '#404040',
}
