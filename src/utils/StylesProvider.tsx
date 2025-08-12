import { createContext, useContext, useEffect, useState } from 'react'
import { cardShapeType } from './grid.types'

type StylesType = {
  shape: cardShapeType
  setShape: (value: cardShapeType) => void
}

const StylesContext = createContext<StylesType | null>(null)
export function StylesProvider({ children }: { children: React.ReactNode }) {
  const [shape, setShape] = useState<cardShapeType | null>(null)

  useEffect(() => {
    // gets shape
    setShape('rounded')
  }, [])

  return (
    <StylesContext.Provider
      value={{ shape: shape ?? 'rounded', setShape: setShape }}>
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
