'use client'
import { useState, useEffect } from 'react'
import { ContextMenuProvider } from '@/contexts/ContextMenuProvider'
import { StylesProvider } from '@/contexts/StylesProvider'
import Footer from '@/components/footer'
import Title from '@/components/title'
import Grid from '@/components/grid'

export default function GridPage({ params }: { params: { id: string } }) {
  const [currentGridName, setCurrentGridName] = useState<string>('Grid')

  // TODO: get current grid
  // TODO: save current grid to StylesProvider
  useEffect(() => {
    alert(params.id)
    setCurrentGridName('Grid')
  }, [])

  return (
    <ContextMenuProvider>
      <StylesProvider>
        <div className={styles.root}>
          <main className={styles.main}>
            <Title
              className="flex sm:hidden"
              gridTitle={currentGridName}
              setGridTitleLeft={setCurrentGridName}
              setGridTitleRight={setCurrentGridName}
            />
            <Grid gridTitle={currentGridName} />
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
