import { Link, useNavigate } from "react-router-dom"
import { Calendar, ClipboardList, LogOut, Moon, Sun, X } from "lucide-react"
import { useAuth } from "../../contexts/AuthContext.jsx"
import { useTheme } from "../../contexts/ThemeContext.jsx"
import { useDashboard } from "../../contexts/DashboardContext.jsx"

export default function Sidebar({ activeSection }) {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const { sidebarOpen, setSidebarOpen } = useDashboard()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    setSidebarOpen(false)
    navigate("/")
  }

  return (
    <aside
      className={`fixed bottom-0 left-0 top-16 z-40 flex w-64 transform flex-col border-r bg-sidebar-bg transition-transform duration-200 ease-in-out lg:sticky lg:h-[calc(100vh-4rem)] lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center gap-3 border-b p-6">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand text-lg font-bold text-[#2E2A2A]">
          K
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xl font-bold leading-tight text-ink">
            KI<span className="text-brand">VO</span>
          </p>
          <p className="truncate text-xs text-muted">{user?.email}</p>
        </div>
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
          className="rounded-lg p-1.5 transition-colors hover:bg-yellow-100 dark:hover:bg-yellow-900/30 lg:hidden"
        >
          <X className="h-5 w-5 text-muted" />
        </button>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        <Link
          to="/dashboard/tasks"
          onClick={() => setSidebarOpen(false)}
          className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
            activeSection === "tasks"
              ? "bg-brand text-[#2E2A2A]"
              : "text-muted hover:bg-yellow-100 dark:hover:bg-yellow-900/30"
          }`}
        >
          <ClipboardList className="h-5 w-5" />
          Tasks
        </Link>
        <Link
          to="/dashboard/calendar"
          onClick={() => setSidebarOpen(false)}
          className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
            activeSection === "calendar"
              ? "bg-brand text-[#2E2A2A]"
              : "text-muted hover:bg-yellow-100 dark:hover:bg-yellow-900/30"
          }`}
        >
          <Calendar className="h-5 w-5" />
          Calendar
        </Link>
      </nav>

      <div className="space-y-2 border-t p-4">
        <button
          onClick={toggleTheme}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-muted transition-colors hover:bg-yellow-50 dark:hover:bg-yellow-900/20"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5 text-yellow-400" />
          ) : (
            <Moon className="h-5 w-5 text-yellow-500" />
          )}
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </button>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-[#ef4444] transition-colors hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </aside>
  )
}
