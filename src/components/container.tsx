import { ContextMenuProvider } from '@/contexts/ContextMenuProvider'
import { UserProvider } from '@/contexts/CurrentUserProvider'
import { StylesProvider } from '@/contexts/StylesProvider'

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <ContextMenuProvider>
        <StylesProvider>
          <div className={styles.root}>
            <main className={styles.main}>{children}</main>
          </div>
        </StylesProvider>
      </ContextMenuProvider>
    </UserProvider>
  )
}

const styles = {
  root: 'font-sans grid grid-rows-[20px_1fr_20px] min-h-screen px-8 py-2 pt-0',
  main: 'flex flex-col gap-4 row-start-2 w-full mx-auto',
}
