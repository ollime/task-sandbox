'use client'
import { useState, useEffect } from 'react'

import Container from '@/components/container'
import Footer from '@/components/footer'
import Title from '@/components/title'
import Grid from '@/components/grid'

export default function GridPage({ params }: { params: { id: string } }) {
  const [currentGridName, setCurrentGridName] = useState<string>('Grid')

  useEffect(() => {
    console.log(params.id)
    setCurrentGridName('Grid')
  }, [])

  return (
    <Container>
      <Title
        className="flex sm:hidden"
        gridTitle={currentGridName}
        setGridTitleLeft={setCurrentGridName}
        setGridTitleRight={setCurrentGridName}
      />
      <Grid gridTitle={currentGridName} />
      <Footer />
    </Container>
  )
}
