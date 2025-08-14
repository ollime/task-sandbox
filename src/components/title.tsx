import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

export default function Title({
  className,
  gridTitle,
  setGridTitleLeft,
  setGridTitleRight,
}: {
  className: string
  gridTitle: string
  setGridTitleLeft: (value: string) => void
  setGridTitleRight: (value: string) => void
}) {
  return (
    <div
      className={`flex flex-wrap items-center justify-center space-x-2 ${className}`}>
      <div onClick={() => setGridTitleLeft}>
        <ChevronLeftIcon fontSize="large" />
      </div>
      <div>{gridTitle}</div>
      <div onClick={() => setGridTitleRight}>
        <ChevronRightIcon fontSize="large" />
      </div>
    </div>
  )
}
