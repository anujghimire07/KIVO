import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export default function CalendarView() {
  const today = new Date()
  const [viewDate, setViewDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  )

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const firstWeekday = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells = []
  for (let i = 0; i < firstWeekday; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  function goToMonth(offset) {
    setViewDate(new Date(year, month + offset, 1))
  }

  function isToday(day) {
    return day === today.getDate() && month === today.getMonth() && year === today.getFullYear()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="hidden text-2xl font-bold text-ink lg:block">Calendar</h2>
        <div className="ml-auto lg:ml-0">
          <button
            onClick={() => setViewDate(new Date(today.getFullYear(), today.getMonth(), 1))}
            className="rounded-full bg-brand px-4 py-2 text-sm font-medium text-[#2E2A2A] transition hover:opacity-90"
          >
            Today
          </button>
        </div>
      </div>

      <div className="rounded-xl border bg-card-bg">
        <div className="flex items-center justify-between border-b p-4">
          <button
            type="button"
            aria-label="Previous month"
            onClick={() => goToMonth(-1)}
            className="rounded-lg p-2 transition-colors hover:bg-yellow-100 dark:hover:bg-yellow-900/30"
          >
            <ChevronLeft className="h-5 w-5 text-ink" />
          </button>
          <h3 className="text-base font-semibold text-ink sm:text-lg">
            {MONTHS[month]} {year}
          </h3>
          <button
            type="button"
            aria-label="Next month"
            onClick={() => goToMonth(1)}
            className="rounded-lg p-2 transition-colors hover:bg-yellow-100 dark:hover:bg-yellow-900/30"
          >
            <ChevronRight className="h-5 w-5 text-ink" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 py-2">
          {WEEKDAYS.map((w) => (
            <div key={w} className="text-center text-xs font-semibold text-muted">
              {w}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 justify-items-center gap-1 p-2 pb-4">
          {cells.map((day, i) =>
            day === null ? (
              <div key={`empty-${i}`} className="h-9 w-9 sm:h-10 sm:w-10" />
            ) : (
              <div
                key={day}
                className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm transition-all sm:h-10 sm:w-10 ${
                  isToday(day)
                    ? "bg-brand font-semibold text-[#2E2A2A]"
                    : "cursor-pointer text-ink hover:bg-yellow-100 dark:hover:bg-yellow-900/30"
                }`}
              >
                {day}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}
