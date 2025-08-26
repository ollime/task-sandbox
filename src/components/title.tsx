import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import LogoutIcon from '@mui/icons-material/Logout'

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
  async function handleLogout() {
    try {
      const res = await fetch('/api/auth/refresh', {
        method: 'DELETE',
      })
      console.log(res)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className={`flex flex-row items-center justify-between ${className}`}>
      <div className="flex flex-1 flex-wrap items-center justify-center space-x-2">
        <div onClick={() => setGridTitleLeft}>
          <ChevronLeftIcon fontSize="large" />
        </div>
        <div>{gridTitle}</div>
        <div onClick={() => setGridTitleRight}>
          <ChevronRightIcon fontSize="large" />
        </div>
      </div>
      <div className="text-sm" onClick={handleLogout}>
        Log out <LogoutIcon />
      </div>
    </div>
  )
}
