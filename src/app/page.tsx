'use client'
import { ContextMenuProvider } from '@/contexts/ContextMenuProvider'
import { StylesProvider } from '@/contexts/StylesProvider'
import Footer from '@/components/footer'
import Header from '@/components/title'
import Grid from '@/components/grid'

export default function Home() {
  return (
    <ContextMenuProvider>
      <StylesProvider>
        <div className={styles.root}>
          <main className={styles.main}>
            <Header className="flex sm:hidden" />
            <Grid />
            <Footer />
          </main>
        </div>
      </StylesProvider>
    </ContextMenuProvider>
  )
}

const styles = {
  root: 'font-sans grid grid-rows-[20px_1fr_20px] min-h-screen px-8 py-2 pt-0',
  main: 'flex flex-col gap-4 row-start-2 w-full mx-auto',
}
