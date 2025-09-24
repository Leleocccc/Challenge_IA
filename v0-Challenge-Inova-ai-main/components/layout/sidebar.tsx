"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Home, Lightbulb, TrendingUp, BarChart3, Sparkles, User, Trophy, Settings, LogOut, ChevronDown, Users, UserCheck, Mail, Building, X, Bell, HelpCircle, Palette, Clock, CheckCircle, AlertCircle, Info, Phone } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useState } from "react"

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
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false)
  const [showUserProfile, setShowUserProfile] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  
  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const settingsOptions = [
    { name: "Perfil", icon: User, action: () => setShowUserProfile(true) },
    { name: "Notificações", icon: Bell, action: () => setShowNotifications(true) },
    { name: "Preferências", icon: Settings, action: () => setShowPreferences(true) },
    { name: "Ajuda", icon: HelpCircle, action: () => setShowHelp(true) },
  ]

  // Dados de exemplo para notificações
  const notifications = [
    {
      id: 1,
      title: "Nova ideia aprovada!",
      message: "Sua ideia 'Sistema de monitoramento energético' foi aprovada para desenvolvimento.",
      type: "success",
      time: "2 horas atrás",
      read: false
    },
    {
      id: 2,
      title: "Feedback recebido",
      message: "Você recebeu feedback na sua ideia 'App de colaboração'.",
      type: "info",
      time: "1 dia atrás",
      read: false
    },
    {
      id: 3,
      title: "Nova sugestão da IA",
      message: "A IA tem uma nova sugestão personalizada para você baseada no seu perfil.",
      type: "info",
      time: "2 dias atrás",
      read: true
    },
    {
      id: 4,
      title: "Ranking atualizado",
      message: "Você subiu 3 posições no ranking de inovação!",
      type: "success",
      time: "3 dias atrás",
      read: true
    }
  ]

  // Dados de exemplo para FAQ
  const faqItems = [
    {
      question: "Como submeter uma nova ideia?",
      answer: "Acesse o menu 'Nova Ideia' no sidebar ou clique no botão 'Nova Ideia' no dashboard. Preencha o formulário com os detalhes da sua ideia e envie para avaliação."
    },
    {
      question: "Como funciona o sistema de pontos?",
      answer: "Você ganha pontos ao submeter ideias, receber aprovações e contribuir com feedback. Os pontos são usados no ranking de inovação da empresa."
    },
    {
      question: "Como a IA gera sugestões?",
      answer: "A IA analisa seu perfil, histórico de ideias e área de atuação para sugerir ideias personalizadas que podem ser relevantes para você."
    },
    {
      question: "Como acompanhar o status das minhas ideias?",
      answer: "Acesse 'Minhas Ideias' para ver todas as suas submissões e seus status: Em Avaliação, Aprovada, Em Desenvolvimento ou Rejeitada."
    }
  ]

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
      <div className="border-t border-gray-200 p-4 bg-gradient-to-r from-gray-50 to-white relative">
        <div 
          className="flex items-center space-x-3 mb-4 cursor-pointer hover:bg-gray-100 rounded-lg p-2 transition-colors"
          onClick={() => setShowUserProfile(true)}
        >
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md">
            <User className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">{user?.name || "Usuário"}</p>
            <p className="text-xs text-gray-500 truncate">{user?.role || "Colaborador"}</p>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </div>
        <div className="flex space-x-2">
          <div className="relative">
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex-1 hover:bg-primary/10 hover:text-primary"
              onClick={() => setShowSettingsDropdown(!showSettingsDropdown)}
            >
              <Settings className="h-4 w-4" />
            </Button>
            {showSettingsDropdown && (
              <div className="absolute bottom-full left-0 mb-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                {settingsOptions.map((option, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors"
                    onClick={() => {
                      option.action()
                      setShowSettingsDropdown(false)
                    }}
                  >
                    <option.icon className="h-4 w-4" />
                    <span>{option.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <Button variant="ghost" size="sm" className="flex-1 hover:bg-red-50 hover:text-red-600" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* User Profile Modal */}
      {showUserProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Perfil do Usuário</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowUserProfile(false)}
                className="hover:bg-gray-100"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* User Info */}
              <div className="text-center">
                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md mx-auto mb-4">
                  <User className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{user?.name || "Usuário"}</h3>
                <p className="text-sm text-gray-500">{user?.role || "Colaborador"}</p>
                <p className="text-sm text-gray-500">{user?.department || "Departamento"}</p>
                <p className="text-sm text-gray-500">{user?.email || "email@eurofarma.com.br"}</p>
              </div>

              {/* Manager */}
              {user?.manager && (
                <Card className="eurofarma-card">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-gray-700 flex items-center">
                      <UserCheck className="h-4 w-4 mr-2" />
                      Gestor
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{user.manager.name}</p>
                        <p className="text-xs text-gray-500">{user.manager.role}</p>
                        <p className="text-xs text-gray-500">{user.manager.department}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Team */}
              {user?.team && user.team.length > 0 && (
                <Card className="eurofarma-card">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-gray-700 flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      Equipe ({user.team.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      {user.team.map((member, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="h-8 w-8 rounded-full bg-secondary/10 flex items-center justify-center">
                            <User className="h-4 w-4 text-secondary" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{member.name}</p>
                            <p className="text-xs text-gray-500">{member.role}</p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {member.department}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Department Info */}
              <Card className="eurofarma-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-700 flex items-center">
                    <Building className="h-4 w-4 mr-2" />
                    Informações do Departamento
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Departamento:</span>
                      <span className="text-sm font-medium">{user?.department || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Cargo:</span>
                      <span className="text-sm font-medium">{user?.role || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Empresa:</span>
                      <span className="text-sm font-medium">Eurofarma</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Modal */}
      {showNotifications && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <Bell className="h-5 w-5 mr-2 text-primary" />
                Notificações
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowNotifications(false)}
                className="hover:bg-gray-100"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-lg border transition-colors ${
                      notification.read 
                        ? 'bg-gray-50 border-gray-200' 
                        : 'bg-primary/5 border-primary/20'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-full ${
                        notification.type === 'success' ? 'bg-green-100' : 'bg-blue-100'
                      }`}>
                        {notification.type === 'success' ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <Info className="h-4 w-4 text-blue-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{notification.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-2 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {notification.time}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="h-2 w-2 bg-primary rounded-full"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => console.log("Marcar todas como lidas")}
                >
                  Marcar todas como lidas
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preferences Modal */}
      {showPreferences && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <Settings className="h-5 w-5 mr-2 text-primary" />
                Preferências
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPreferences(false)}
                className="hover:bg-gray-100"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Notificações */}
              <Card className="eurofarma-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-700 flex items-center">
                    <Bell className="h-4 w-4 mr-2" />
                    Notificações
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Notificações por email</span>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Notificações push</span>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Lembretes de ideias</span>
                    <input type="checkbox" className="rounded" />
                  </div>
                </CardContent>
              </Card>

              {/* Tema */}
              <Card className="eurofarma-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-700 flex items-center">
                    <Palette className="h-4 w-4 mr-2" />
                    Aparência
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Tema</span>
                    <select className="text-sm border rounded px-2 py-1">
                      <option>Claro</option>
                      <option>Escuro</option>
                      <option>Sistema</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Idioma</span>
                    <select className="text-sm border rounded px-2 py-1">
                      <option>Português</option>
                      <option>English</option>
                    </select>
                  </div>
                </CardContent>
              </Card>

              {/* Privacidade */}
              <Card className="eurofarma-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-700 flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Privacidade
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Perfil público</span>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Mostrar no ranking</span>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                </CardContent>
              </Card>

              <div className="flex space-x-3">
                <Button className="flex-1 eurofarma-button-primary">
                  Salvar
                </Button>
                <Button variant="outline" className="flex-1">
                  Cancelar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <HelpCircle className="h-5 w-5 mr-2 text-primary" />
                Central de Ajuda
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowHelp(false)}
                className="hover:bg-gray-100"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="p-6">
              {/* FAQ Section */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Perguntas Frequentes</h3>
                <div className="space-y-4">
                  {faqItems.map((item, index) => (
                    <Card key={index} className="eurofarma-card">
                      <CardContent className="p-4">
                        <h4 className="font-medium text-gray-900 mb-2">{item.question}</h4>
                        <p className="text-sm text-gray-600">{item.answer}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Contact Section */}
              <Card className="eurofarma-card">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-gray-700 flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    Precisa de mais ajuda?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">suporte@eurofarma.com.br</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">(11) 3003-3003</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Segunda a Sexta, 8h às 18h</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
