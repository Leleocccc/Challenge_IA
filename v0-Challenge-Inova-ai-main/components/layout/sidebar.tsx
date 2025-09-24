"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Home, Lightbulb, TrendingUp, BarChart3, Sparkles, User, Trophy, Settings, LogOut } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Nova Ideia", href: "/submit-idea", icon: Lightbulb },
  { name: "Minhas Ideias", href: "/my-ideas", icon: TrendingUp },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "IA Sugestões", href: "/ai-suggestions", icon: Sparkles },
  { name: "Ranking", href: "/leaderboard", icon: Trophy },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()
  
  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <div className="flex h-full w-64 flex-col bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 shadow-lg">
      {/* Logo */}
      <div className="flex h-20 items-center justify-center border-b border-gray-200 bg-gradient-to-r from-primary to-accent">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-md">
            <div className="h-6 w-6 text-primary">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">
              EUROFARMA
            </h1>
            <p className="text-xs text-white/80 font-medium">Movidos pela vida</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 group",
                isActive
                  ? "bg-primary text-white shadow-md"
                  : "text-gray-700 hover:bg-primary/10 hover:text-primary hover:shadow-sm",
              )}
            >
              <item.icon className={cn(
                "h-5 w-5 transition-colors",
                isActive ? "text-white" : "text-gray-500 group-hover:text-primary"
              )} />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>

      {/* User Profile */}
      <div className="border-t border-gray-200 p-4 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center space-x-3 mb-4">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md">
            <User className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">{user?.name || "Usuário"}</p>
            <p className="text-xs text-gray-500 truncate">{user?.role || "Colaborador"}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" className="flex-1 hover:bg-primary/10 hover:text-primary">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="flex-1 hover:bg-red-50 hover:text-red-600" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
