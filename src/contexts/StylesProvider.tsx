import { createContext, useContext, useEffect, useState } from 'react'
import { cardShapeType, gridSizeType } from '../types/grid.types'

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
  const [gridSpacing, setGridSpacing] = useState<gridSizeType>('none')
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true)

  useEffect(() => {
    // gets data from local storage
    setCardShape(localStorage.getItem('cardShape') as cardShapeType)
    setGridSpacing(localStorage.getItem('gridSpacing') as gridSizeType)
    setIsDarkMode(localStorage.getItem('isDarkMode') === 'true')
  }, [])

  function setData(key: string, value: string) {
    console.log(key, value)
    localStorage.setItem(key, value)
  }

  return (
    <StylesContext.Provider
      value={{
        cardShape,
        setCardShape: (value: cardShapeType) => {
          setCardShape(value)
          setData('cardData', value)
        },
        isDarkMode,
        setIsDarkMode: (value: boolean) => {
          setIsDarkMode(value)
          setData('isDarkMode', JSON.stringify(value))
        },
        gridSpacing,
        setGridSpacing: (value: gridSizeType) => {
          setGridSpacing(value)
          setData('gridSpacing', value)
        },
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
