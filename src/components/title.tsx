import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

export default function Header({ className }: { className: string }) {
  return (
    <div
      className={`flex flex-wrap items-center justify-center space-x-2 ${className}`}>
      <ChevronLeftIcon fontSize="large" />
      <div>Grid</div>
      <ChevronRightIcon fontSize="large" />
    </div>
  )
}
