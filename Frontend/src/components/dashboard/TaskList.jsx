import { useEffect, useState } from "react"
import { ArrowDown, ArrowUp, Check, ClipboardList, Pencil, Trash2 } from "lucide-react"
import { api } from "../../api.js"

const PRIORITIES = ["No Priority", "Low", "Medium", "High"]

const PRIORITY_COLORS = {
  "No Priority": "#aeb7b3",
  Low: "#22c55e",
  Medium: "#eab308",
  High: "#ef4444",
}

const PRIORITY_ORDER = { "No Priority": 0, Low: 1, Medium: 2, High: 3 }

const FILTERS = ["all", "pending", "completed"]

const inputClass =
  "rounded-xl border border-input-line bg-input-bg px-4 py-2.5 text-sm text-ink outline-none transition placeholder:text-muted focus:border-brand focus:ring-2 focus:ring-brand"

function formatDate(value) {
  if (!value) return ""
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return ""
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })
}

export default function TaskList() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState("")
  const [priority, setPriority] = useState("No Priority")
  const [filter, setFilter] = useState("all")
  const [sortBy, setSortBy] = useState(null)
  const [sortDir, setSortDir] = useState("asc")
  const [error, setError] = useState("")
  const [editingId, setEditingId] = useState(null)
  const [editTitle, setEditTitle] = useState("")
  const [editPriority, setEditPriority] = useState("No Priority")

  useEffect(() => {
    let cancelled = false
    async function load() {
      const res = await api("/todos", { method: "GET" })
      if (cancelled) return
      if (res.ok) {
        setTasks(res.data?.data || [])
      } else {
        setError(res.data?.error || "Failed to load tasks")
      }
      setLoading(false)
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  // auto-dismiss error banner after 4 seconds
  useEffect(() => {
    if (!error) return
    const t = setTimeout(() => setError(""), 4000)
    return () => clearTimeout(t)
  }, [error])

  async function handleAdd(e) {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    const res = await api("/todos", {
      method: "POST",
      body: JSON.stringify({ title: trimmed, priority }),
    })
    if (res.ok) {
      setTasks((prev) => [res.data.data, ...prev])
      setTitle("")
      setPriority("No Priority")
    } else {
      setError(res.data?.error || "Failed to add task")
    }
  }

  async function handleToggle(task) {
    const next = { ...task, completed: !task.completed }
    setTasks((prev) => prev.map((t) => (t._id === task._id ? next : t)))
    const res = await api(`/todos/${task._id}`, {
      method: "PATCH",
      body: JSON.stringify({ completed: next.completed }),
    })
    if (!res.ok) {
      setError("Failed to update task")
      setTasks((prev) => prev.map((t) => (t._id === task._id ? task : t)))
    }
  }

  async function handleDelete(id) {
    const res = await api(`/todos/${id}`, { method: "DELETE" })
    if (res.ok) {
      setTasks((prev) => prev.filter((t) => t._id !== id))
    } else {
      setError("Failed to delete task")
    }
  }

  function startEdit(task) {
    setEditingId(task._id)
    setEditTitle(task.title)
    setEditPriority(task.priority || "No Priority")
  }

  async function handleSaveEdit(e, task) {
    e.preventDefault()
    const trimmed = editTitle.trim()
    if (!trimmed) return
    const res = await api(`/todos/${task._id}`, {
      method: "PATCH",
      body: JSON.stringify({ title: trimmed, priority: editPriority }),
    })
    if (res.ok) {
      setTasks((prev) => prev.map((t) => (t._id === task._id ? res.data.new_data : t)))
      setEditingId(null)
    } else {
      setError("Failed to save changes")
    }
  }

  function toggleSort(key) {
    if (sortBy === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortBy(key)
      setSortDir("asc")
    }
  }

  const filtered = tasks.filter((t) => {
    if (filter === "pending") return !t.completed
    if (filter === "completed") return t.completed
    return true
  })

  const sorted = [...filtered].sort((a, b) => {
    const dir = sortDir === "asc" ? 1 : -1
    if (sortBy === "priority") return (PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]) * dir
    if (sortBy === "date") return (new Date(a.date) - new Date(b.date)) * dir
    return 0
  })

  const total = tasks.length
  const done = tasks.filter((t) => t.completed).length
  const left = total - done
  const pct = total ? Math.round((done / total) * 100) : 0
  const ringLength = 2 * Math.PI * 30
  const ringDash = `${(pct / 100) * ringLength} ${ringLength}`

  const sortBtnClass = (key) =>
    `inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
      sortBy === key
        ? "bg-brand text-[#2E2A2A]"
        : "border border-line bg-transparent text-muted hover:text-ink"
    }`

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-yellow-500 border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* progress card */}
      <div className="rounded-xl border bg-card-bg p-5">
        <div className="flex flex-col items-center gap-5 sm:flex-row">
          <div className="relative flex-shrink-0">
            <svg width="80" height="80" viewBox="0 0 80 80" className="-rotate-90">
              <circle cx="40" cy="40" r="30" fill="none" stroke="var(--color-border)" strokeWidth="6" />
              <circle
                cx="40"
                cy="40"
                r="30"
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={ringDash}
                className="transition-all duration-500"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-ink">
              {pct}%
            </span>
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-bold text-ink">Good progress!</h3>
            <p className="mt-1 text-sm text-muted">
              {done}/{total} tasks completed
            </p>
          </div>
          <div className="flex flex-1 items-center justify-center gap-8 sm:justify-end sm:gap-10">
            <div className="text-center">
              <p className="text-xl font-bold text-ink">{total}</p>
              <p className="text-xs text-muted">Total</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-green-500">{done}</p>
              <p className="text-xs text-muted">Done</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-[#ef4444]">{left}</p>
              <p className="text-xs text-muted">Left</p>
            </div>
          </div>
        </div>
      </div>

      {/* error banner */}
      {error && (
        <div className="rounded-lg border border-[#fecaca] bg-[#fef2f2] p-3 text-sm font-medium text-[#ef4444]">
          {error}
        </div>
      )}

      {/* add task form */}
      <form onSubmit={handleAdd} className="flex flex-wrap gap-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          className={`${inputClass} min-w-[200px] flex-1`}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)} className={inputClass}>
          {PRIORITIES.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-[#2E2A2A] transition hover:opacity-90"
        >
          Add Task
        </button>
      </form>

      {/* filter & sort bar */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
        <div className="flex flex-wrap gap-2 sm:border-r sm:border-line sm:pr-4">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                filter === f
                  ? "bg-brand text-[#2E2A2A]"
                  : "border border-line bg-transparent text-muted hover:text-ink"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted">Sort:</span>
          <button onClick={() => toggleSort("priority")} className={sortBtnClass("priority")}>
            Priority
            {sortBy === "priority" &&
              (sortDir === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />)}
          </button>
          <button onClick={() => toggleSort("date")} className={sortBtnClass("date")}>
            Date
            {sortBy === "date" &&
              (sortDir === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />)}
          </button>
          {sortBy && (
            <button
              onClick={() => {
                setSortBy(null)
                setSortDir("asc")
              }}
              className="text-xs font-medium text-brand hover:underline"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* task list */}
      {sorted.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <ClipboardList className="h-16 w-16 text-muted opacity-30" />
          <p className="mt-4 text-sm text-muted">
            {tasks.length === 0 ? "No tasks yet. Add one above!" : "No tasks match this filter."}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {sorted.map((task) => {
            const color = PRIORITY_COLORS[task.priority] || PRIORITY_COLORS["No Priority"]
            return (
              <div
                key={task._id}
                className={`group flex overflow-hidden rounded-xl border bg-card-bg transition hover:shadow-md ${
                  task.completed ? "opacity-60" : ""
                }`}
              >
                <div className="w-1.5 flex-shrink-0" style={{ backgroundColor: color }} />

                {editingId === task._id ? (
                  <form
                    onSubmit={(e) => handleSaveEdit(e, task)}
                    className="flex flex-1 flex-wrap items-center gap-2 p-3"
                  >
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="min-w-[150px] flex-1 rounded-lg border border-input-line bg-input-bg px-3 py-2 text-sm text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand"
                    />
                    <select
                      value={editPriority}
                      onChange={(e) => setEditPriority(e.target.value)}
                      className="rounded-lg border border-input-line bg-input-bg px-2 py-2 text-sm text-ink outline-none focus:border-brand"
                    >
                      {PRIORITIES.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                    <button
                      type="submit"
                      className="rounded-lg bg-green-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
                      className="rounded-lg px-3 py-2 text-sm font-medium text-ink transition"
                      style={{ backgroundColor: "var(--color-border)" }}
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                  <>
                    <div className="flex min-w-0 flex-1 items-center gap-3 px-3 py-3">
                      <button
                        type="button"
                        aria-label={task.completed ? "Mark as pending" : "Mark as done"}
                        onClick={() => handleToggle(task)}
                        className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                          task.completed
                            ? "border-green-500 bg-green-500"
                            : "border-input-line hover:border-brand"
                        }`}
                      >
                        {task.completed && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                      </button>
                      <div className="min-w-0 flex-1">
                        <p
                          className={`truncate text-sm font-medium ${
                            task.completed ? "text-muted line-through" : "text-ink"
                          }`}
                        >
                          {task.title}
                        </p>
                        {task.date && <p className="mt-0.5 text-xs text-muted">{formatDate(task.date)}</p>}
                      </div>
                      <span
                        className="flex-shrink-0 rounded-md px-2 py-1 text-[10px] font-medium"
                        style={{ backgroundColor: `${color}20`, color }}
                      >
                        {task.priority || "No Priority"}
                      </span>
                    </div>
                    <div className="flex flex-shrink-0 items-center gap-1 pr-3 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
                      <button
                        type="button"
                        aria-label="Edit task"
                        onClick={() => startEdit(task)}
                        className="rounded-lg p-2 text-muted transition-colors hover:bg-yellow-100 dark:hover:bg-yellow-900/30 hover:text-ink"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        aria-label="Delete task"
                        onClick={() => handleDelete(task._id)}
                        className="rounded-lg p-2 text-[#ef4444] transition-colors hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
