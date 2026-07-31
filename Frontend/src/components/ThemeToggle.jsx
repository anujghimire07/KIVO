import { Moon, Sun } from "lucide-react"
import { useTheme } from "../contexts/ThemeContext.jsx"

export default function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useTheme()
  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className={`rounded-lg p-2 transition-colors hover:bg-yellow-100 dark:hover:bg-yellow-900/30 ${className}`}
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-yellow-400" />
      ) : (
        <Moon className="h-5 w-5 text-yellow-500" />
      )}
    </button>
  )
}
