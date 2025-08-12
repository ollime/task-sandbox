export default function Header() {
  return (
    <footer className="row-start-3 flex flex-wrap items-center justify-center gap-[24px]">
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="https://github.com/ollime/productive-app"
        target="_blank"
        rel="noopener noreferrer">
        Source code
      </a>
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="https://github.com/ollime/productive-app/issues"
        target="_blank"
        rel="noopener noreferrer">
        Report issues
      </a>
    </footer>
  )
}
