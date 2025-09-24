"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Medal, Award, TrendingUp, Users, Target, Crown } from "lucide-react"

export default function LeaderboardPage() {
  const topUsers = [
    {
      id: 1,
      name: "Ana Silva",
      department: "P&D",
      position: 1,
      points: 2850,
      ideasSubmitted: 12,
      ideasImplemented: 5,
      badges: ["Inovador", "Colaborativo", "Visionário"],
      avatar: "/professional-woman-diverse.png",
      trend: "up",
      monthlyPoints: 450,
    },
    {
      id: 2,
      name: "Carlos Santos",
      department: "Tecnologia",
      position: 2,
      points: 2720,
      ideasSubmitted: 15,
      ideasImplemented: 4,
      badges: ["Tech Expert", "Mentor", "Inovador"],
      avatar: "/professional-man.png",
      trend: "up",
      monthlyPoints: 380,
    },
    {
      id: 3,
      name: "Maria Oliveira",
      department: "Produção",
      position: 3,
      points: 2650,
      ideasSubmitted: 10,
      ideasImplemented: 6,
      badges: ["Eficiência", "Qualidade", "Líder"],
      avatar: "/professional-woman-manager.png",
      trend: "stable",
      monthlyPoints: 320,
    },
  ]

  const allUsers = [
    ...topUsers,
    {
      id: 4,
      name: "João Pereira",
      department: "Marketing",
      position: 4,
      points: 2480,
      ideasSubmitted: 8,
      ideasImplemented: 3,
      badges: ["Criativo", "Estratégico"],
      avatar: "/professional-man-marketing.png",
      trend: "up",
      monthlyPoints: 290,
    },
    {
      id: 5,
      name: "Fernanda Costa",
      department: "Qualidade",
      position: 5,
      points: 2350,
      ideasSubmitted: 11,
      ideasImplemented: 2,
      badges: ["Detalhista", "Analítica"],
      avatar: "/professional-woman-quality.jpg",
      trend: "down",
      monthlyPoints: 250,
    },
    {
      id: 6,
      name: "Roberto Lima",
      department: "Vendas",
      position: 6,
      points: 2180,
      ideasSubmitted: 7,
      ideasImplemented: 4,
      badges: ["Comercial", "Relacionamento"],
      avatar: "/professional-man-sales.jpg",
      trend: "up",
      monthlyPoints: 220,
    },
    {
      id: 7,
      name: "Luciana Rocha",
      department: "RH",
      position: 7,
      points: 2050,
      ideasSubmitted: 9,
      ideasImplemented: 1,
      badges: ["Pessoas", "Cultura"],
      avatar: "/professional-woman-hr.png",
      trend: "stable",
      monthlyPoints: 180,
    },
    {
      id: 8,
      name: "Paulo Mendes",
      department: "Financeiro",
      position: 8,
      points: 1920,
      ideasSubmitted: 6,
      ideasImplemented: 2,
      badges: ["Analítico", "ROI"],
      avatar: "/professional-man-finance.png",
      trend: "up",
      monthlyPoints: 160,
    },
  ]

  const departments = [
    { name: "P&D", points: 8450, members: 15, avgPoints: 563 },
    { name: "Tecnologia", points: 7890, members: 12, avgPoints: 658 },
    { name: "Produção", points: 6720, members: 18, avgPoints: 373 },
    { name: "Marketing", points: 5640, members: 8, avgPoints: 705 },
    { name: "Qualidade", points: 4980, members: 10, avgPoints: 498 },
  ]

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />
      default:
        return <span className="text-lg font-bold text-gray-500">#{position}</span>
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "down":
        return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />
      default:
        return <div className="h-4 w-4 bg-gray-300 rounded-full" />
    }
  }

  return (
    <div className="p-6 space-y-8 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      {/* Header */}
      <div>
        <h1 className="eurofarma-header eurofarma-gradient-text">Ranking de Inovação</h1>
        <p className="eurofarma-subheader">Reconhecimento dos colaboradores mais inovadores • Movidos pela vida</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="eurofarma-metric-card">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">156</div>
              <p className="text-sm font-medium text-gray-600">Participantes Ativos</p>
            </div>
          </div>
          <p className="text-xs text-gray-500">Colaboradores engajados</p>
        </div>

        <div className="eurofarma-metric-card">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-full bg-secondary/10">
              <Trophy className="h-6 w-6 text-secondary" />
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-secondary">45.2K</div>
              <p className="text-sm font-medium text-gray-600">Total de Pontos</p>
            </div>
          </div>
          <p className="text-xs text-gray-500">Pontuação acumulada</p>
        </div>

        <div className="eurofarma-metric-card">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-full bg-green-100">
              <Target className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600">27</div>
              <p className="text-sm font-medium text-gray-600">Ideias Implementadas</p>
            </div>
          </div>
          <p className="text-xs text-gray-500">Projetos em produção</p>
        </div>

        <div className="eurofarma-metric-card">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-full bg-purple-100">
              <Award className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-purple-600">89</div>
              <p className="text-sm font-medium text-gray-600">Badges Conquistados</p>
            </div>
          </div>
          <p className="text-xs text-gray-500">Conquistas alcançadas</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top 3 Podium */}
        <div className="lg:col-span-2">
          <div className="eurofarma-card">
            <div className="p-6">
              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="p-2 rounded-full bg-secondary/10">
                    <Trophy className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Top 3 Inovadores</h3>
                </div>
                <p className="text-gray-600">Os colaboradores mais inovadores do mês</p>
              </div>
              <div className="space-y-4">
                {topUsers.map((user) => (
                  <div key={user.id} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center justify-center w-10 h-10">{getPositionIcon(user.position)}</div>

                    <Avatar className="h-14 w-14 border-2 border-white shadow-md">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback className="bg-primary text-white font-semibold">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-bold text-gray-900">{user.name}</h3>
                        {getTrendIcon(user.trend)}
                      </div>
                      <p className="text-sm text-gray-600">{user.department}</p>
                      <div className="flex space-x-1 mt-2">
                        {user.badges.slice(0, 2).map((badge, index) => (
                          <div key={index} className="eurofarma-innovation-badge">
                            {badge}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-xl font-bold text-primary">{user.points.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">+{user.monthlyPoints} este mês</p>
                      <div className="flex space-x-2 text-xs text-gray-600 mt-1">
                        <span>{user.ideasSubmitted} ideias</span>
                        <span>•</span>
                        <span>{user.ideasImplemented} implementadas</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Department Ranking */}
        <div>
          <div className="eurofarma-card">
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Ranking por Departamento</h3>
                <p className="text-gray-600">Pontuação total por área</p>
              </div>
              <div className="space-y-3">
                {departments.map((dept, index) => (
                  <div key={dept.name} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-bold text-primary">#{index + 1}</span>
                      <div>
                        <p className="font-semibold text-gray-900">{dept.name}</p>
                        <p className="text-xs text-gray-600">{dept.members} membros</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">{dept.points.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">Média: {dept.avgPoints}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Ranking */}
      <div className="eurofarma-card">
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Ranking Completo</h3>
            <p className="text-gray-600">Todos os participantes do programa de inovação</p>
          </div>
          <div className="space-y-3">
            {allUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center justify-center w-8 h-8">
                  {user.position <= 3 ? (
                    getPositionIcon(user.position)
                  ) : (
                    <span className="text-sm font-bold text-gray-500">#{user.position}</span>
                  )}
                </div>

                <Avatar className="h-10 w-10 border border-gray-200">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback className="bg-primary text-white text-xs font-semibold">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <p className="font-semibold text-gray-900">{user.name}</p>
                    {getTrendIcon(user.trend)}
                  </div>
                  <p className="text-xs text-gray-600">{user.department}</p>
                </div>

                <div className="text-right">
                  <p className="font-bold text-primary">{user.points.toLocaleString()}</p>
                  <div className="flex space-x-1 text-xs text-gray-600">
                    <span>{user.ideasSubmitted}i</span>
                    <span>•</span>
                    <span>{user.ideasImplemented}impl</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}