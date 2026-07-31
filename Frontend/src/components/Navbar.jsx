import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import {
  Calendar,
  ChevronDown,
  ClipboardList,
  LogOut,
  Menu,
  X,
} from "lucide-react"
import { useAuth } from "../contexts/AuthContext.jsx"
import { useDashboard } from "../contexts/DashboardContext.jsx"
import ThemeToggle from "./ThemeToggle.jsx"

export default function Navbar() {
  const { user, logout } = useAuth()
  const { setSidebarOpen } = useDashboard()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dashboardExpanded, setDashboardExpanded] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const isDashboardRoute = location.pathname.startsWith("/dashboard")

  const isActive = (to) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to)

  async function handleLogout() {
    await logout()
    setMobileMenuOpen(false)
    navigate("/")
  }

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ]

  return (
    <header className="sticky top-0 z-50 border-b bg-surface-bg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-2xl font-bold tracking-tight text-ink">
          KI<span className="text-brand">VO</span>
        </Link>

        {/* desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm font-medium transition-colors ${
                isActive(l.to) ? "text-brand" : "text-muted hover:text-ink"
              }`}
            >
              {l.label}
            </Link>
          ))}
          {user && (
            <Link
              to="/dashboard/tasks"
              className={`text-sm font-medium transition-colors ${
                isDashboardRoute ? "text-brand" : "text-muted hover:text-ink"
              }`}
            >
              Dashboard
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />

          {user ? (
            <>
              <span className="hidden max-w-[180px] truncate text-sm text-muted sm:block">
                {user.email}
              </span>
              <button
                onClick={handleLogout}
                className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-[#2E2A2A] transition hover:opacity-90"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden items-center rounded-lg border border-brand px-4 py-2 text-sm font-medium text-brand transition-colors hover:bg-brand-light sm:flex"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="hidden items-center rounded-lg bg-brand px-4 py-2 text-sm font-medium text-[#2E2A2A] transition hover:opacity-90 sm:flex"
              >
                Sign Up
              </Link>
            </>
          )}

          {isDashboardRoute ? (
            <button
              type="button"
              aria-label="Open sidebar"
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 transition-colors hover:bg-yellow-100 dark:hover:bg-yellow-900/30 md:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
          ) : (
            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => {
                setMobileMenuOpen((o) => !o)
                setDashboardExpanded(false)
              }}
              className="rounded-lg p-2 transition-colors hover:bg-yellow-100 dark:hover:bg-yellow-900/30 md:hidden"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          )}
        </div>
      </div>

      {/* invisible backdrop to close the mobile menu */}
      {!isDashboardRoute && mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-transparent md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* mobile nav drawer */}
      {!isDashboardRoute && mobileMenuOpen && (
        <div className="relative z-50 border-t bg-surface-bg md:hidden">
          <div className="space-y-1 px-4 py-3">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                  isActive(l.to)
                    ? "bg-brand-light text-brand"
                    : "text-muted hover:text-ink"
                }`}
              >
                {l.label}
              </Link>
            ))}

            <button
              type="button"
              onClick={() => setDashboardExpanded((e) => !e)}
              className="flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-sm font-medium text-muted transition-colors hover:text-ink"
            >
              Dashboard
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  dashboardExpanded ? "rotate-180" : ""
                }`}
              />
            </button>

            {dashboardExpanded && (
              <div className="ml-3 space-y-1 border-l border-line pl-3">
                <Link
                  to="/dashboard/tasks"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-muted transition-colors hover:bg-yellow-100 dark:hover:bg-yellow-900/30"
                >
                  <ClipboardList className="h-4 w-4" /> Tasks
                </Link>
                <Link
                  to="/dashboard/calendar"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-muted transition-colors hover:bg-yellow-100 dark:hover:bg-yellow-900/30"
                >
                  <Calendar className="h-4 w-4" /> Calendar
                </Link>
              </div>
            )}

            <div className="mt-2 border-t border-line pt-2">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-[#ef4444] transition-colors hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <LogOut className="h-4 w-4" /> Logout
                </button>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex w-full items-center justify-center rounded-lg border border-brand px-4 py-2.5 text-sm font-medium text-brand"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex w-full items-center justify-center rounded-lg bg-brand px-4 py-2.5 text-sm font-medium text-[#2E2A2A]"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
