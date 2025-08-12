import { createContext, useContext, useEffect, useState } from 'react'
import { cardShapeType, gridSizeType } from './grid.types'

type StylesType = {
  cardShape: cardShapeType
  setCardShape: (value: cardShapeType) => void
  isDarkMode: boolean
  setIsDarkMode: (value: boolean) => void
  gridSpacing: gridSizeType
  setGridSpacing: (value: gridSizeType) => void
}

const StylesContext = createContext<StylesType | null>(null)
export function StylesProvider({ children }: { children: React.ReactNode }) {
  const [cardShape, setCardShape] = useState<cardShapeType>('rounded')
  const [gridSpacing, setGridSpacing] = useState<gridSizeType>('1.0')
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true)

  useEffect(() => {
    // gets data from local storage
    setCardShape('rounded')
    setGridSpacing('1.0')
    setIsDarkMode(true)
  }, [])

  return (
    <StylesContext.Provider
      value={{
        cardShape,
        setCardShape,
        isDarkMode,
        setIsDarkMode,
        gridSpacing,
        setGridSpacing,
      }}>
      {children}
    </StylesContext.Provider>
  )
}

export const useStyles = () => {
  const ctx = useContext(StylesContext)
  if (!ctx)
    throw new Error('useStyles must be used inside StylesContext.Provider')
  return ctx
}
