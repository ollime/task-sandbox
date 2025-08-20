'use client'
import { sizePreset } from '@/types/card.types'
import Container from '@/components/container'
import ArchiveCard from '@/components/archiveCard'

export default function ArchivePage() {
  return (
    <Container>
      <ArchiveCard
        size={sizePreset.lgRect}
        label="This is a card"></ArchiveCard>
    </Container>
  )
}
