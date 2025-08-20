'use client'
import { useEffect, useState, use } from 'react'
import { CardData, sizePreset, SizeKeys } from '@/types/card.types'
import Container from '@/components/container'
import ArchiveCard from '@/components/archiveCard'
import { ArrowBack } from '@mui/icons-material'
import { useRouter } from 'next/navigation'

export default function ArchivePage({
  params,
}: {
  params: Promise<{ userId: string }>
}) {
  const [data, setData] = useState<Array<CardData>>([
    { label: 'djflsfd', size: 'lgRect', rotated: true },
    { label: 'djflsfd', size: 'mdSquare', rotated: true },
    { label: 'djflsfd', size: 'lgSquare', rotated: true },
  ])
  const { userId } = use(params)
  const router = useRouter()

  useEffect(() => {
    /** loads initial data */
    async function getCardData() {
      try {
        await fetch('/api/archive')
          .then((res) => {
            return res.json()
          })
          .then((json) => {
            /** Save to local app state */
            const jsonArray = []
            for (const card of json) {
              jsonArray.push(card)
            }
            setData(jsonArray)
          })
      } catch (err) {
        console.log(err)
      }
    }
    getCardData()
  }, [])

  function handleRedirectToGrid() {
    router?.push(`/grid/${userId}`)
  }

  return (
    <Container>
      <div className="flex flex-row items-center space-x-2">
        <ArrowBack onClick={handleRedirectToGrid} />
        <h1 className="text-xl">Archive</h1>
      </div>
      <div className="flex flex-wrap space-y-4 space-x-4">
        {data.map((item) => (
          <ArchiveCard
            key={item.label}
            label={item.label}
            color={item.color}
            size={sizePreset[item.size as SizeKeys]}
            cardId={item._id ?? item.label}
            rotation={item.rotated}
          />
        ))}
      </div>
    </Container>
  )
}
