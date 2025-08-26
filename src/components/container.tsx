import { ContextMenuProvider } from '@/contexts/ContextMenuProvider'
import { UserProvider } from '@/contexts/CurrentUserProvider'
import { StylesProvider } from '@/contexts/StylesProvider'
import { ErrorBoundary } from 'react-error-boundary'

export default function Container({ children }: { children: React.ReactNode }) {
  function fallbackRender({
    error,
    resetErrorBoundary,
  }: {
    error: any
    resetErrorBoundary: () => void
  }) {
    return (
      <div role="alert">
        <p>Something went wrong:</p>
        <pre style={{ color: 'red' }}>{error.message}</pre>
      </div>
    )
  }

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <UserProvider>
        <ContextMenuProvider>
          <StylesProvider>
            <div className={styles.root}>
              <main className={styles.main}>{children}</main>
            </div>
          </StylesProvider>
        </ContextMenuProvider>
      </UserProvider>
    </ErrorBoundary>
  )
}

const styles = {
  root: 'font-sans grid grid-rows-[20px_1fr_20px] min-h-screen px-8 py-2 pt-0',
  main: 'flex flex-col gap-4 row-start-2 w-full mx-auto',
}
