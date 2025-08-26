import { ContextMenuProvider } from '@/contexts/ContextMenuProvider'
import { UserProvider } from '@/contexts/CurrentUserProvider'
import { StylesProvider } from '@/contexts/StylesProvider'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

export default function Container({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  function fallbackRender({
    error,
    resetErrorBoundary,
  }: {
    error: any
    resetErrorBoundary: () => void
  }): ReactNode {
    return (
      <div
        role="alert"
        className="m-4 flex h-full flex-1 flex-col items-center justify-center">
        <p>Something went wrong:</p>
        <pre style={{ color: 'red' }}>{error.message}</pre>

        <p
          onClick={() => {
            router?.push('/')
          }}
          className="hover:cursor-pointer hover:underline">
          Return to login page
        </p>
      </div>
    )
  }

  return (
    <ErrorBoundary
      fallbackRender={fallbackRender}
      onReset={(details) => {
        // reset app
      }}>
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
