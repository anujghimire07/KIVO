import { Atom, Check, Database, Hexagon, Server, ShieldCheck, Wind, Zap } from "lucide-react"

const features = [
  "Add, edit, and delete tasks in seconds",
  "Set priorities from No Priority to High",
  "Toggle tasks complete with a single click",
  "Sort your list by priority or date",
  "Filter by All, Pending, or Completed",
  "Track progress with a live completion ring",
  "Browse a full month calendar view",
]

const techStack = [
  { name: "React", color: "#61DAFB", Icon: Atom },
  { name: "Vite", color: "#646CFF", Icon: Zap },
  { name: "Tailwind", color: "#06B6D4", Icon: Wind },
  { name: "Node.js", color: "#339933", Icon: Hexagon },
  { name: "Express", color: "#666666", Icon: Server },
  { name: "MongoDB", color: "#47A248", Icon: Database },
  { name: "JWT", color: "#D63AFF", Icon: ShieldCheck },
]

export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand text-2xl font-bold text-[#2E2A2A]">
          K
        </div>
        <h1 className="mt-5 text-3xl font-bold text-ink sm:text-4xl">About KIVO</h1>
        <p className="mt-3 max-w-xl text-sm text-muted">
          A minimal task manager built to keep your workflow calm, organized, and
          beautifully simple.
        </p>
      </div>

      <div className="mt-12 space-y-6">
        <div className="rounded-2xl border bg-card-bg p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-ink">Our Mission</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Most productivity tools feel like a second job. KIVO exists to strip
            away the noise — giving you a clean space to capture tasks, set
            priorities, and see your progress at a glance. No clutter, no
            distractions, just the things that matter.
          </p>
        </div>

        <div className="rounded-2xl border bg-card-bg p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-ink">Key Features</h2>
          <ul className="mt-4 space-y-3">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-3 text-sm text-muted">
                <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-light">
                  <Check className="h-3 w-3 text-brand" strokeWidth={3} />
                </span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border bg-card-bg p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-ink">Tech Stack</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {techStack.map(({ name, color, Icon }) => (
              <span
                key={name}
                className="inline-flex items-center gap-2 rounded-lg border border-brand bg-brand-light px-4 py-2 text-sm font-medium text-brand"
              >
                <Icon className="h-4 w-4" style={{ color }} />
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
