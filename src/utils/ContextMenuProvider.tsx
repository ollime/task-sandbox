import { Coordinates } from '@dnd-kit/core/dist/types'
import { useState, useEffect, createContext, useContext } from 'react'

type MenuContextType = {
  clicked: string | null
  setClicked: (value: string) => void
  points: Coordinates
  setPoints: (points: Coordinates) => void
}

const MenuContext = createContext<MenuContextType | null>(null)
export function ContextMenuProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [clicked, setClicked] = useState<string | null>(null)
  const [points, setPoints] = useState({
    x: 0,
    y: 0,
  })
  useEffect(() => {
    const handleClick = (evt: MouseEvent) => {
      const target = evt.target as HTMLInputElement
      if (
        target.parentElement?.getAttribute('role') != 'menu' &&
        target.parentElement?.parentElement?.getAttribute('role') != 'menu' &&
        target.parentElement?.parentElement?.parentElement?.getAttribute(
          'role'
        ) != 'menu'
      ) {
        setClicked('')
      }
    }
    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [])
  return (
    <MenuContext.Provider value={{ clicked, setClicked, points, setPoints }}>
      {children}
    </MenuContext.Provider>
  )
}

export const useContextMenu = () => {
  const ctx = useContext(MenuContext)
  if (!ctx)
    throw new Error('useContextMenu must be used inside ContextMenuProvider')
  return ctx
}
