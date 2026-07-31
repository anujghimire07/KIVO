/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react"

const DashboardContext = createContext(null)

export function DashboardProvider({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <DashboardContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
      {children}
    </DashboardContext.Provider>
  )
}

export function useDashboard() {
  return useContext(DashboardContext)
}
