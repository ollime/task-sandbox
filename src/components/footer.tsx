import Image from 'next/image'
import CodeIcon from '@mui/icons-material/Code'
import BugReportIcon from '@mui/icons-material/BugReport'

export default function Footer() {
  return (
    <footer className="row-start-3 flex flex-wrap items-center justify-center gap-[24px]">
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="https://github.com/ollime/productive-app"
        target="_blank"
        rel="noopener noreferrer">
        <CodeIcon />
        Source code
      </a>
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="https://github.com/ollime/productive-app/issues"
        target="_blank"
        rel="noopener noreferrer">
        <BugReportIcon />
        Report issues
      </a>
    </footer>
  )
}
