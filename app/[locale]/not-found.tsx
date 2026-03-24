export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-[var(--bg)]">
      <div className="text-[80px] font-black text-[var(--p)] leading-none">404</div>
      <div className="text-xl font-bold text-[var(--t1)] mt-4">Page not found</div>
      <div className="text-sm text-[var(--t3)] mt-2">The page you are looking for does not exist.</div>
      <a href="/" className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-[var(--p)] hover:bg-[var(--p-dark)] transition-colors">
        Go home
      </a>
    </div>
  )
}
