import { LabelData } from '@/types/label.types'

export default function Label({ label, position }: LabelData) {
  return <p className="text-lg">{label}</p>
}
