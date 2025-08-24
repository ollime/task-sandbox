'use client'
import Container from '@/components/container'
import LoginPage from '@/components/login'
import CodeIcon from '@mui/icons-material/Code'
import BugReportIcon from '@mui/icons-material/BugReport'

export default function Home() {
  return (
    <Container>
      <LoginPage></LoginPage>
      <div className="flex flex-1 flex-row items-end justify-center space-x-4">
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
    </Container>
  )
}
