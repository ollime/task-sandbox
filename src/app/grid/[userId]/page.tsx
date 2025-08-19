'use client'
import { useState, useEffect, use } from 'react'

import Container from '@/components/container'
import Footer from '@/components/footer'
import Title from '@/components/title'
import { GridData } from '@/types/grid.types'

export default function GridPage({
  params,
}: {
  params: Promise<{ userId: string }>
}) {
  const { userId } = use(params)
  const [currentGridName, setCurrentGridName] = useState<string>('Grid')
  const [grids, setGrids] = useState<Array<GridData>>([])

  async function getAllGrids() {
    await fetch('/api/grids', {
      method: 'GET',
      credentials: 'same-origin',
    })
      .then((res) => {
        return res.json()
      })
      .then((json) => {
        setGrids(json)
      })
  }

  async function createNewGrid() {
    console.log(userId)
    const newGrid = {
      user: userId,
      name: 'Grid',
      cards: [],
    }
    await fetch('/api/grids', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newGrid),
    }).then(() => {
      setGrids([...grids, newGrid])
    })
  }

  useEffect(() => {
    getAllGrids()
    if (grids.length < 1) {
      createNewGrid()
    }
    console.log(grids)
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
      {/* <Grid gridTitle={currentGridName} /> */}
      <Footer />
    </Container>
  )
}
