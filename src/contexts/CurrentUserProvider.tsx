import { createContext, useContext, useState } from 'react'

type UserType = {
  username: string | null
  setUsername: (value: string) => void
}

const UserContext = createContext<UserType | null>(null)
export function UserProvider({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = useState<string | null>(null)
  return (
    <UserContext.Provider
      value={{ username: username, setUsername: setUsername }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error('useUser must be used inside UserContext.Provider')
  return ctx
}
