import { Link } from "react-router-dom"
import { ClipboardList, Flag, TrendingUp } from "lucide-react"
import { useAuth } from "../contexts/AuthContext.jsx"

const mockTasks = [
  { title: "Design landing page", time: "9:00 AM", priority: "#ef4444", category: "Design" },
  { title: "Review pull requests", time: "11:30 AM", priority: "#eab308", category: "Work" },
  { title: "Buy groceries", time: "2:00 PM", priority: "#22c55e", category: "Personal" },
  { title: "Read for 30 minutes", time: "9:00 PM", priority: "#aeb7b3", category: "Growth" },
]

const features = [
  {
    icon: ClipboardList,
    title: "Manage Tasks",
    description:
      "Add, edit, and delete tasks in seconds with a clean, distraction-free interface.",
  },
  {
    icon: Flag,
    title: "Set Priorities",
    description:
      "Tag every task as No Priority, Low, Medium, or High and sort your day the way you want.",
  },
  {
    icon: TrendingUp,
    title: "Track Progress",
    description:
      "Watch your completion ring fill up as you knock tasks off your list, one by one.",
  },
]

export default function Home() {
  const { user } = useAuth()

  return (
    <div className="flex flex-col bg-soft">
      <section className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-center gap-12 px-4 py-16 sm:px-6 lg:flex-row lg:justify-between lg:py-24 lg:px-8">
        {/* left: hero copy */}
        <div className="max-w-xl text-center lg:text-left">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-light px-4 py-1.5 text-xs font-medium text-brand">
            <span className="h-2 w-2 animate-pulse rounded-full bg-brand" />
            Your tasks, organized
          </div>

          <h1 className="mt-6 text-3xl font-extrabold leading-tight text-ink sm:text-5xl lg:text-6xl">
            Stay on top of
            <br />
            <span className="text-brand">your workflow</span>
          </h1>

          <p className="mt-5 text-lg leading-relaxed text-muted">
            KIVO keeps your to-dos simple. Add tasks, set priorities, mark them
            done, and let the built-in calendar keep you grounded — all in one
            calm, minimal space.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            {user ? (
              <Link
                to="/dashboard/tasks"
                className="rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-[#2E2A2A] transition hover:opacity-90"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-[#2E2A2A] transition hover:opacity-90"
                >
                  Get Started Free
                </Link>
                <Link
                  to="/login"
                  className="rounded-xl border-2 border-brand px-6 py-3 text-sm font-semibold text-brand transition-colors hover:bg-yellow-50 dark:hover:bg-yellow-900/20"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>

        {/* right: mock task preview */}
        <div className="w-full max-w-md space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-ink">Today&apos;s Tasks</h2>
            <span className="rounded-full bg-brand-light px-3 py-1 text-xs font-medium text-brand">
              4 tasks
            </span>
          </div>
          {mockTasks.map((task) => (
            <div
              key={task.title}
              className="group flex overflow-hidden rounded-xl border bg-card-bg transition hover:shadow-md"
            >
              <div className="w-1.5 flex-shrink-0" style={{ backgroundColor: task.priority }} />
              <div className="flex flex-1 items-center gap-3 px-4 py-3">
                <span className="h-4 w-4 flex-shrink-0 rounded-full border-2" style={{ borderColor: task.priority }} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink">{task.title}</p>
                  <p className="mt-0.5 text-xs text-muted">{task.time}</p>
                </div>
                <span className="rounded-md bg-brand-light px-2 py-1 text-[10px] font-medium text-brand">
                  {task.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* features */}
      <section className="border-t bg-surface-bg">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-xl border bg-card-bg p-6 transition hover:shadow-md"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-light">
                <Icon className="h-8 w-8 text-brand" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
