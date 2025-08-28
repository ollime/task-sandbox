import CodeIcon from '@mui/icons-material/Code'
import BugReportIcon from '@mui/icons-material/BugReport'
import Title from './title'

interface FooterPropType {
  gridTitle: string
  saveAllCards: () => void
  handleLockPosition: () => void
}

export default function Footer({
  gridTitle,
  saveAllCards,
  handleLockPosition,
}: FooterPropType) {
  return (
    <footer className="row-start-3 flex w-full flex-wrap items-center justify-between">
      <div className="space-x-4">
        <a
          className="flex items-center gap-1 text-sm hover:underline hover:underline-offset-4"
          href="https://github.com/ollime/productive-app"
          target="_blank"
          rel="noopener noreferrer">
          <CodeIcon fontSize="small" />
          Source
        </a>
        <a
          className="flex items-center gap-1 text-sm hover:underline hover:underline-offset-4"
          href="https://github.com/ollime/productive-app/issues"
          target="_blank"
          rel="noopener noreferrer">
          <BugReportIcon fontSize="small" />
          Report issues
        </a>
      </div>
      <Title
        className="hidden w-80 sm:flex"
        gridTitle={gridTitle}
        setGridTitleLeft={() => {}}
        setGridTitleRight={() => {}}
      />
      <div className="space-x-4">
        <button
          className="rounded-lg bg-white p-2 text-sm text-black"
          onClick={saveAllCards}>
          Save cards
        </button>
        {/* <button
          className="rounded-lg bg-white p-2 text-sm text-black"
          onClick={handleLockPosition}>
          Lock position
        </button> */}
      </div>
    </footer>
  )
}
