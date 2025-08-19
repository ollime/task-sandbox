import { CardData } from './card.types'

export type gridSizeType = '0.125' | '0.25' | '0.5' | '1.0' | 'none'
export const gridSizes = ['0.125', '0.25', '0.5', '1.0', 'none']
export type cardShapeType = 'sharp' | 'rounded'

export interface GridData {
  user: string
  name: string
  cards: Array<CardData>
}
