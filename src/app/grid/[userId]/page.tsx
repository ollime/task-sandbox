'use client'
import { useState, useEffect, use } from 'react'

import Container from '@/components/container'
import Title from '@/components/title'
import Grid from '@/components/grid'
import { GridData } from '@/types/grid.types'

export default function GridPage({
  params,
}: {
  params: Promise<{ userId: string }>
}) {
  const { userId } = use(params)
  const [currentGridName, setCurrentGridName] = useState<string>('Grid')
  const [grids, setGrids] = useState<Array<GridData>>([])

  useEffect(() => {
    async function getAllGrids() {
      try {
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
      } catch (err: any) {
        console.log(err)
      }
    }

    async function createNewGrid() {
      if (userId === 'undefined') {
        alert('user not found')
      }

      // do not create duplicate grid
      const containsGrid = grids.some((grid) => grid.name === 'Grid')
      if (containsGrid) {
        return
      }

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
        setCurrentGridName(newGrid.name ?? '')
      })
    }

    if (userId) {
      getAllGrids()
    }
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
    </Container>
  )
}
