'use client'
import { useState, useEffect } from 'react'

import Container from '@/components/container'
import Footer from '@/components/footer'
import Title from '@/components/title'
import Grid from '@/components/grid'

export default function GridPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const [currentGridName, setCurrentGridName] = useState<string>('Grid')

  async function getAllGrids() {
    const res = await fetch('/api/grids', {
      method: 'GET',
      credentials: 'same-origin',
    })
    return res.json()
  }

  useEffect(() => {
    // const { id } = use(params)
    // console.log(id)
    console.log(getAllGrids())
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
