'use client'
import { ContextMenuProvider } from '@/utils/ContextMenuProvider'
import Footer from '@/components/footer'
import Grid from '@/components/grid'

export default function Home() {
  return (
    <ContextMenuProvider>
      <div className={styles.root}>
        <main className={styles.main}>
          <Grid />
          <Footer />
        </main>
      </div>
    </ContextMenuProvider>
  )
}

const styles = {
  root: 'font-sans grid grid-rows-[20px_1fr_20px] min-h-screen px-8 py-4',
  main: 'flex flex-col gap-8 row-start-2 w-full mx-auto',
}
