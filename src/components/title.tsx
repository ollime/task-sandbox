import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

export default function Header({
  className,
  gridTitle,
}: {
  className: string
  gridTitle: string
}) {
  return (
    <div
      className={`flex flex-wrap items-center justify-center space-x-2 ${className}`}>
      <ChevronLeftIcon fontSize="large" />
      <div>{gridTitle}</div>
      <ChevronRightIcon fontSize="large" />
    </div>
  )
}
