'use client'
import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'

import DeleteIcon from '@mui/icons-material/Delete'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'
import { ArrowBack } from '@mui/icons-material'

import { CardData, sizePreset, SizeKeys } from '@/types/card.types'
import Container from '@/components/container'
import ArchiveCard from '@/components/archiveCard'

export default function ArchivePage({
  params,
}: {
  params: Promise<{ userId: string }>
}) {
  const [data, setData] = useState<Array<CardData>>([
    { label: 'dskf', size: 'lgRect', rotated: true },
    { label: 'eep', size: 'mdSquare', rotated: true },
    { label: 'djflsfd', size: 'lgSquare', rotated: true },
  ])
  const [isCompact, setIsCompact] = useState<boolean>()
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
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row space-x-2">
          <ArrowBack onClick={handleRedirectToGrid} />
          <h1 className="text-xl">Archive</h1>
        </div>
        <div
          onClick={() => {
            setIsCompact(!isCompact)
          }}>
          Display: {isCompact ? 'Cards' : 'Table'}
        </div>
      </div>
      {isCompact ? (
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
      ) : (
        <table>
          <thead>
            <tr>
              <th scope="col" className="text-start">
                Name
              </th>
              <th scope="col" className="text-start">
                Color
              </th>
              <th scope="col" className="text-start">
                Size
              </th>
              <th scope="col" className="text-start">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.label}>
                <td className="break-all">{item.label}</td>
                <td>{item.color}</td>
                <td>{item.size}</td>
                <td className="flex flex-row flex-wrap space-x-4">
                  <span className="flex items-center space-x-1 hover:cursor-pointer hover:underline">
                    <KeyboardReturnIcon sx={{ fontSize: 20 }} />
                    <p>Send to...</p>
                  </span>
                  <span className="flex items-center space-x-1 text-red-500 hover:cursor-pointer hover:underline">
                    <DeleteIcon sx={{ fontSize: 20 }} />
                    <p>Delete</p>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Container>
  )
}
