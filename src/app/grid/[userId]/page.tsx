'use client'
import { useState, useEffect, use } from 'react'

import Container from '@/components/container'
import Footer from '@/components/footer'
import Title from '@/components/title'
import Grid from '@/components/grid'
import { GridData } from '@/types/grid.types'
import { useRouter } from 'next/navigation'

export default function GridPage({
  params,
}: {
  params: Promise<{ userId: string }>
}) {
  const { userId } = use(params)
  const router = useRouter()
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
        if (json.length < 1) {
          createNewGrid()
        }
        return json
      })
      .then((json) => {
        setCurrentGridName(json[0]?.name ?? '')
        console.log(json)
      })
  }

  async function createNewGrid() {
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
    if (userId === 'undefined' || !userId) {
      router.push('/')
    }
    getAllGrids()
  }, [])

  return (
    <Container>
      <Title
        className="flex sm:hidden"
        gridTitle={currentGridName}
        setGridTitleLeft={setCurrentGridName}
        setGridTitleRight={setCurrentGridName}
      />
      <Grid gridTitle={currentGridName} userId={userId} />
      <Footer />
    </Container>
  )
}
