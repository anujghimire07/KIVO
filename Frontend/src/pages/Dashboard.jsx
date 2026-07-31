import { Menu } from "lucide-react"
import { useLocation } from "react-router-dom"
import { useDashboard } from "../contexts/DashboardContext.jsx"
import Sidebar from "../components/dashboard/Sidebar.jsx"
import TaskList from "../components/dashboard/TaskList.jsx"
import CalendarView from "../components/dashboard/CalendarView.jsx"

export default function Dashboard() {
  const { pathname } = useLocation()
  const { sidebarOpen, setSidebarOpen } = useDashboard()
  const activeSection = pathname.includes("calendar") ? "calendar" : "tasks"

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-soft">
      {/* mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar activeSection={activeSection} />

      <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-4xl">
          {/* mobile section header */}
          <div className="mb-6 flex items-center justify-between lg:hidden">
            <h2 className="text-lg font-semibold text-ink">
              {activeSection === "tasks" ? "Tasks" : "Calendar"}
            </h2>
            {/* <button
              type="button"
              aria-label="Open sidebar"
              onClick={() => setSidebarOpen(true)}
              className="rounded-xl border bg-card-bg p-2 shadow-sm"
            >
              <Menu className="h-5 w-5 text-ink" />
            </button> */}
          </div>

          {activeSection === "tasks" ? <TaskList /> : <CalendarView />}
        </div>
      </main>
    </div>
  )
}
