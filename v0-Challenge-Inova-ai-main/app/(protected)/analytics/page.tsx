"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts"
import { Users, Lightbulb, Award, Zap } from "lucide-react"

// Dados base para diferentes períodos
const baseData = {
  "1month": {
    monthly: [
      { month: "Jun", ideias: 67, aprovadas: 25, implementadas: 8 },
    ],
    categories: [
      { name: "Tecnologia", value: 40, color: "#164e63" },
      { name: "Sustentabilidade", value: 30, color: "#ea580c" },
      { name: "Processos", value: 20, color: "#4b5563" },
      { name: "Produtos", value: 10, color: "#ecfeff" },
    ],
    departments: [
      { department: "P&D", ideias: 25, aprovadas: 12 },
      { department: "TI", ideias: 20, aprovadas: 8 },
      { department: "Produção", ideias: 15, aprovadas: 3 },
      { department: "Marketing", ideias: 4, aprovadas: 1 },
      { department: "RH", ideias: 3, aprovadas: 1 },
    ],
    kpis: { total: 67, approval: 37, participants: 45, implementations: 8 }
  },
  "3months": {
    monthly: [
      { month: "Abr", ideias: 61, aprovadas: 22, implementadas: 7 },
      { month: "Mai", ideias: 55, aprovadas: 19, implementadas: 6 },
      { month: "Jun", ideias: 67, aprovadas: 25, implementadas: 8 },
    ],
    categories: [
      { name: "Tecnologia", value: 38, color: "#164e63" },
      { name: "Sustentabilidade", value: 28, color: "#ea580c" },
      { name: "Processos", value: 22, color: "#4b5563" },
      { name: "Produtos", value: 12, color: "#ecfeff" },
    ],
    departments: [
      { department: "P&D", ideias: 70, aprovadas: 28 },
      { department: "TI", ideias: 55, aprovadas: 22 },
      { department: "Produção", ideias: 40, aprovadas: 15 },
      { department: "Marketing", ideias: 25, aprovadas: 8 },
      { department: "RH", ideias: 15, aprovadas: 5 },
    ],
    kpis: { total: 183, approval: 35, participants: 98, implementations: 21 }
  },
  "6months": {
    monthly: [
      { month: "Jan", ideias: 45, aprovadas: 12, implementadas: 3 },
      { month: "Fev", ideias: 52, aprovadas: 15, implementadas: 5 },
      { month: "Mar", ideias: 48, aprovadas: 18, implementadas: 4 },
      { month: "Abr", ideias: 61, aprovadas: 22, implementadas: 7 },
      { month: "Mai", ideias: 55, aprovadas: 19, implementadas: 6 },
      { month: "Jun", ideias: 67, aprovadas: 25, implementadas: 8 },
    ],
    categories: [
      { name: "Tecnologia", value: 35, color: "#164e63" },
      { name: "Sustentabilidade", value: 25, color: "#ea580c" },
      { name: "Processos", value: 20, color: "#4b5563" },
      { name: "Produtos", value: 15, color: "#ecfeff" },
      { name: "Outros", value: 5, color: "#475569" },
    ],
    departments: [
      { department: "P&D", ideias: 89, aprovadas: 34 },
      { department: "TI", ideias: 67, aprovadas: 28 },
      { department: "Produção", ideias: 45, aprovadas: 18 },
      { department: "Marketing", ideias: 34, aprovadas: 12 },
      { department: "RH", ideias: 23, aprovadas: 8 },
    ],
    kpis: { total: 328, approval: 34, participants: 156, implementations: 33 }
  },
  "1year": {
    monthly: [
      { month: "Jul", ideias: 42, aprovadas: 14, implementadas: 2 },
      { month: "Ago", ideias: 38, aprovadas: 16, implementadas: 3 },
      { month: "Set", ideias: 51, aprovadas: 20, implementadas: 4 },
      { month: "Out", ideias: 48, aprovadas: 18, implementadas: 5 },
      { month: "Nov", ideias: 55, aprovadas: 22, implementadas: 6 },
      { month: "Dez", ideias: 62, aprovadas: 24, implementadas: 7 },
      { month: "Jan", ideias: 45, aprovadas: 12, implementadas: 3 },
      { month: "Fev", ideias: 52, aprovadas: 15, implementadas: 5 },
      { month: "Mar", ideias: 48, aprovadas: 18, implementadas: 4 },
      { month: "Abr", ideias: 61, aprovadas: 22, implementadas: 7 },
      { month: "Mai", ideias: 55, aprovadas: 19, implementadas: 6 },
      { month: "Jun", ideias: 67, aprovadas: 25, implementadas: 8 },
    ],
    categories: [
      { name: "Tecnologia", value: 32, color: "#164e63" },
      { name: "Sustentabilidade", value: 28, color: "#ea580c" },
      { name: "Processos", value: 22, color: "#4b5563" },
      { name: "Produtos", value: 13, color: "#ecfeff" },
      { name: "Outros", value: 5, color: "#475569" },
    ],
    departments: [
      { department: "P&D", ideias: 156, aprovadas: 58 },
      { department: "TI", ideias: 134, aprovadas: 52 },
      { department: "Produção", ideias: 98, aprovadas: 38 },
      { department: "Marketing", ideias: 76, aprovadas: 28 },
      { department: "RH", ideias: 52, aprovadas: 18 },
    ],
    kpis: { total: 624, approval: 36, participants: 298, implementations: 66 }
  }
}

// Dados para diferentes departamentos
const departmentFilterData = {
  "P&D": {
    categories: [
      { name: "Tecnologia", value: 45, color: "#164e63" },
      { name: "Produtos", value: 30, color: "#ecfeff" },
      { name: "Processos", value: 20, color: "#4b5563" },
      { name: "Sustentabilidade", value: 5, color: "#ea580c" },
    ],
    topPerformers: [
      { name: "Ana Silva", department: "P&D", ideas: 12, approved: 8 },
      { name: "Roberto Lima", department: "P&D", ideas: 10, approved: 7 },
      { name: "Carla Mendes", department: "P&D", ideas: 8, approved: 6 },
    ]
  },
  "TI": {
    categories: [
      { name: "Tecnologia", value: 60, color: "#164e63" },
      { name: "Processos", value: 25, color: "#4b5563" },
      { name: "Sustentabilidade", value: 10, color: "#ea580c" },
      { name: "Produtos", value: 5, color: "#ecfeff" },
    ],
    topPerformers: [
      { name: "Carlos Santos", department: "TI", ideas: 10, approved: 7 },
      { name: "Fernanda Costa", department: "TI", ideas: 8, approved: 6 },
      { name: "Lucas Oliveira", department: "TI", ideas: 7, approved: 5 },
    ]
  },
  "Produção": {
    categories: [
      { name: "Processos", value: 50, color: "#4b5563" },
      { name: "Sustentabilidade", value: 30, color: "#ea580c" },
      { name: "Tecnologia", value: 15, color: "#164e63" },
      { name: "Produtos", value: 5, color: "#ecfeff" },
    ],
    topPerformers: [
      { name: "Maria Oliveira", department: "Produção", ideas: 8, approved: 6 },
      { name: "José Silva", department: "Produção", ideas: 7, approved: 5 },
      { name: "Patricia Santos", department: "Produção", ideas: 6, approved: 4 },
    ]
  },
  "Marketing": {
    categories: [
      { name: "Produtos", value: 40, color: "#ecfeff" },
      { name: "Processos", value: 30, color: "#4b5563" },
      { name: "Tecnologia", value: 20, color: "#164e63" },
      { name: "Sustentabilidade", value: 10, color: "#ea580c" },
    ],
    topPerformers: [
      { name: "João Costa", department: "Marketing", ideas: 7, approved: 5 },
      { name: "Amanda Lima", department: "Marketing", ideas: 6, approved: 4 },
      { name: "Rafael Mendes", department: "Marketing", ideas: 5, approved: 3 },
    ]
  },
  "RH": {
    categories: [
      { name: "Processos", value: 60, color: "#4b5563" },
      { name: "Sustentabilidade", value: 25, color: "#ea580c" },
      { name: "Tecnologia", value: 10, color: "#164e63" },
      { name: "Produtos", value: 5, color: "#ecfeff" },
    ],
    topPerformers: [
      { name: "Pedro Lima", department: "RH", ideas: 6, approved: 4 },
      { name: "Sandra Costa", department: "RH", ideas: 5, approved: 3 },
      { name: "Marcos Silva", department: "RH", ideas: 4, approved: 2 },
    ]
  }
}

export default function Analytics() {
  const [selectedPeriod, setSelectedPeriod] = useState("6months")
  const [selectedDepartment, setSelectedDepartment] = useState("all")

  // Dados filtrados baseados nas seleções
  const filteredData = useMemo(() => {
    const periodData = baseData[selectedPeriod as keyof typeof baseData]
    
    if (selectedDepartment === "all") {
      return {
        monthly: periodData.monthly,
        categories: periodData.categories,
        departments: periodData.departments,
        kpis: periodData.kpis,
        topPerformers: [
          { name: "Ana Silva", department: "P&D", ideas: 12, approved: 8 },
          { name: "Carlos Santos", department: "TI", ideas: 10, approved: 7 },
          { name: "Maria Oliveira", department: "Produção", ideas: 8, approved: 6 },
          { name: "João Costa", department: "Marketing", ideas: 7, approved: 5 },
          { name: "Pedro Lima", department: "RH", ideas: 6, approved: 4 },
        ]
      }
    } else {
      const deptData = departmentFilterData[selectedDepartment as keyof typeof departmentFilterData]
      return {
        monthly: periodData.monthly.map(month => ({
          ...month,
          ideias: Math.round(month.ideias * 0.3),
          aprovadas: Math.round(month.aprovadas * 0.3),
          implementadas: Math.round(month.implementadas * 0.3)
        })),
        categories: deptData.categories,
        departments: periodData.departments.filter(dept => dept.department === selectedDepartment),
        kpis: {
          total: Math.round(periodData.kpis.total * 0.3),
          approval: Math.round(periodData.kpis.approval * 1.1),
          participants: Math.round(periodData.kpis.participants * 0.2),
          implementations: Math.round(periodData.kpis.implementations * 0.3)
        },
        topPerformers: deptData.topPerformers
      }
    }
  }, [selectedPeriod, selectedDepartment])

  return (
    <div className="p-6 space-y-8 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="eurofarma-header eurofarma-gradient-text">Analytics</h1>
          <p className="eurofarma-subheader">Insights estratégicos sobre inovação • Movidos pela vida</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Último mês</SelectItem>
              <SelectItem value="3months">Últimos 3 meses</SelectItem>
              <SelectItem value="6months">Últimos 6 meses</SelectItem>
              <SelectItem value="1year">Último ano</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filtrar por departamento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os departamentos</SelectItem>
              <SelectItem value="P&D">P&D</SelectItem>
              <SelectItem value="TI">TI</SelectItem>
              <SelectItem value="Produção">Produção</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
              <SelectItem value="RH">RH</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="eurofarma-metric-card">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <Lightbulb className="h-6 w-6 text-primary" />
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">{filteredData.kpis.total}</div>
              <p className="text-sm font-medium text-gray-600">Total de Ideias</p>
            </div>
          </div>
          <p className="text-xs text-gray-500">
            <span className="text-green-600 font-medium">+12%</span> vs mês anterior
          </p>
        </div>

        <div className="eurofarma-metric-card">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-full bg-green-100">
              <Award className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600">{filteredData.kpis.approval}%</div>
              <p className="text-sm font-medium text-gray-600">Taxa de Aprovação</p>
            </div>
          </div>
          <p className="text-xs text-gray-500">
            <span className="text-green-600 font-medium">+5%</span> vs mês anterior
          </p>
        </div>

        <div className="eurofarma-metric-card">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-full bg-secondary/10">
              <Users className="h-6 w-6 text-secondary" />
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-secondary">{filteredData.kpis.participants}</div>
              <p className="text-sm font-medium text-gray-600">Participantes Ativos</p>
            </div>
          </div>
          <p className="text-xs text-gray-500">
            <span className="text-green-600 font-medium">+8%</span> vs mês anterior
          </p>
        </div>

        <div className="eurofarma-metric-card">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-full bg-blue-100">
              <Zap className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">{filteredData.kpis.implementations}</div>
              <p className="text-sm font-medium text-gray-600">Implementações</p>
            </div>
          </div>
          <p className="text-xs text-gray-500">
            <span className="text-green-600 font-medium">+15%</span> vs mês anterior
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <div className="eurofarma-card">
          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Tendências Mensais</h3>
              <p className="text-gray-600">Evolução de ideias, aprovações e implementações</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={filteredData.monthly}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Area type="monotone" dataKey="ideias" stackId="1" stroke="#1e3a8a" fill="#1e3a8a" fillOpacity={0.6} />
                <Area
                  type="monotone"
                  dataKey="aprovadas"
                  stackId="2"
                  stroke="#f59e0b"
                  fill="#f59e0b"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="implementadas"
                  stackId="3"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="eurofarma-card">
          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Distribuição por Categoria</h3>
              <p className="text-gray-600">Percentual de ideias por área de atuação</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={filteredData.categories}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {filteredData.categories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Department Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Performance por Departamento</CardTitle>
          <CardDescription>Ideias submetidas e aprovadas por área</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredData.departments}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="ideias" fill="#164e63" name="Ideias Submetidas" />
              <Bar dataKey="aprovadas" fill="#ea580c" name="Ideias Aprovadas" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Inovadores</CardTitle>
            <CardDescription>
              {selectedDepartment === "all" 
                ? "Colaboradores com mais ideias aprovadas" 
                : `Top inovadores do departamento ${selectedDepartment}`
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredData.topPerformers.map((person, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{person.name}</p>
                      <p className="text-xs text-muted-foreground">{person.department}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{person.approved} aprovadas</p>
                    <p className="text-xs text-muted-foreground">{person.ideas} total</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ideias em Destaque</CardTitle>
            <CardDescription>
              {selectedDepartment === "all" 
                ? "Projetos com maior impacto potencial" 
                : `Ideias em destaque do departamento ${selectedDepartment}`
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(() => {
                const ideas = selectedDepartment === "all" ? [
                  {
                    title: "Sistema de IA para Descoberta de Medicamentos",
                    author: "Ana Silva",
                    impact: "Alto",
                    status: "Em Desenvolvimento",
                  },
                  {
                    title: "Plataforma de Telemedicina Corporativa",
                    author: "Carlos Santos",
                    impact: "Alto",
                    status: "Aprovada",
                  },
                  {
                    title: "Programa de Sustentabilidade Verde",
                    author: "Maria Oliveira",
                    impact: "Médio",
                    status: "Implementada",
                  },
                ] : (() => {
                  const deptIdeas = {
                    "P&D": [
                      { title: "Sistema de IA para Descoberta de Medicamentos", author: "Ana Silva", impact: "Alto", status: "Em Desenvolvimento" },
                      { title: "Nova Formulação de Medicamento", author: "Roberto Lima", impact: "Alto", status: "Aprovada" },
                      { title: "Processo de Purificação Otimizado", author: "Carla Mendes", impact: "Médio", status: "Implementada" },
                    ],
                    "TI": [
                      { title: "Plataforma de Telemedicina Corporativa", author: "Carlos Santos", impact: "Alto", status: "Aprovada" },
                      { title: "Sistema de Gestão de Dados", author: "Fernanda Costa", impact: "Médio", status: "Em Desenvolvimento" },
                      { title: "Automação de Processos", author: "Lucas Oliveira", impact: "Médio", status: "Implementada" },
                    ],
                    "Produção": [
                      { title: "Programa de Sustentabilidade Verde", author: "Maria Oliveira", impact: "Médio", status: "Implementada" },
                      { title: "Otimização de Linha de Produção", author: "José Silva", impact: "Alto", status: "Aprovada" },
                      { title: "Redução de Desperdícios", author: "Patricia Santos", impact: "Médio", status: "Em Desenvolvimento" },
                    ],
                    "Marketing": [
                      { title: "Campanha Digital Inovadora", author: "João Costa", impact: "Médio", status: "Aprovada" },
                      { title: "Plataforma de Engajamento", author: "Amanda Lima", impact: "Médio", status: "Em Desenvolvimento" },
                      { title: "Estratégia de Mercado", author: "Rafael Mendes", impact: "Alto", status: "Implementada" },
                    ],
                    "RH": [
                      { title: "Programa de Desenvolvimento", author: "Pedro Lima", impact: "Médio", status: "Aprovada" },
                      { title: "Sistema de Avaliação", author: "Sandra Costa", impact: "Médio", status: "Em Desenvolvimento" },
                      { title: "Iniciativa de Bem-estar", author: "Marcos Silva", impact: "Alto", status: "Implementada" },
                    ]
                  }
                  return deptIdeas[selectedDepartment as keyof typeof deptIdeas] || []
                })()
                
                return ideas.map((idea, index) => (
                  <div key={index} className="p-3 border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant={idea.impact === "Alto" ? "default" : "secondary"}>{idea.impact} Impacto</Badge>
                      <Badge variant="outline">{idea.status}</Badge>
                    </div>
                    <h4 className="font-medium text-sm">{idea.title}</h4>
                    <p className="text-xs text-muted-foreground">Por {idea.author}</p>
                  </div>
                ))
              })()}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}