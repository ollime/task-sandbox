'use client'
import { useState, useEffect, use } from 'react'

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

  async function getCurrentGrid() {
    fetch('/api/grid', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  useEffect(() => {
    // const { id } = use(params)
    // console.log(id)
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
