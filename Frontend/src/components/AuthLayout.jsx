export default function AuthLayout({ logo, title, subtitle, error, children, footer }) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-soft px-4 py-12">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand text-2xl font-bold text-[#2E2A2A]">
            {logo}
          </div>
          <h1 className="mt-5 text-2xl font-bold text-ink sm:text-3xl">{title}</h1>
          <p className="mt-2 text-sm text-muted">{subtitle}</p>
        </div>

        <div className="mt-8 rounded-2xl border bg-card-bg p-6 sm:p-8">
          {error && (
            <div className="mb-5 rounded-lg border border-[#fecaca] bg-[#fef2f2] p-3 text-sm font-medium text-[#ef4444]">
              {error}
            </div>
          )}
          <div className="space-y-5">{children}</div>
        </div>

        <p className="mt-6 text-center text-sm text-muted">{footer}</p>
      </div>
    </div>
  )
}
