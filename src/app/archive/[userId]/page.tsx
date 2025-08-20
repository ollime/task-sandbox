'use client'
import { useEffect, useState } from 'react'
import { CardData, sizePreset, SizeKeys } from '@/types/card.types'
import Container from '@/components/container'
import ArchiveCard from '@/components/archiveCard'

export default function ArchivePage() {
  const [data, setData] = useState<Array<CardData>>([])

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

  return (
    <Container>
      <ArchiveCard
        size={sizePreset.smRect}
        label="This is a card"></ArchiveCard>
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
    </Container>
  )
}
