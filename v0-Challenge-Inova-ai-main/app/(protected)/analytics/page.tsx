"use client"

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

const monthlyData = [
  { month: "Jan", ideias: 45, aprovadas: 12, implementadas: 3 },
  { month: "Fev", ideias: 52, aprovadas: 15, implementadas: 5 },
  { month: "Mar", ideias: 48, aprovadas: 18, implementadas: 4 },
  { month: "Abr", ideias: 61, aprovadas: 22, implementadas: 7 },
  { month: "Mai", ideias: 55, aprovadas: 19, implementadas: 6 },
  { month: "Jun", ideias: 67, aprovadas: 25, implementadas: 8 },
]

const categoryData = [
  { name: "Tecnologia", value: 35, color: "#164e63" },
  { name: "Sustentabilidade", value: 25, color: "#ea580c" },
  { name: "Processos", value: 20, color: "#4b5563" },
  { name: "Produtos", value: 15, color: "#ecfeff" },
  { name: "Outros", value: 5, color: "#475569" },
]

const departmentData = [
  { department: "P&D", ideias: 89, aprovadas: 34 },
  { department: "TI", ideias: 67, aprovadas: 28 },
  { department: "Produção", ideias: 45, aprovadas: 18 },
  { department: "Marketing", ideias: 34, aprovadas: 12 },
  { department: "RH", ideias: 23, aprovadas: 8 },
]

export default function Analytics() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground">Insights estratégicos sobre inovação na Eurofarma</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select defaultValue="6months">
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
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Ideias</CardTitle>
            <Lightbulb className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">328</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> vs mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Aprovação</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">34%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+5%</span> vs mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Participantes Ativos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">156</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8%</span> vs mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Implementações</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">33</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+15%</span> vs mês anterior
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Tendências Mensais</CardTitle>
            <CardDescription>Evolução de ideias, aprovações e implementações</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="ideias" stackId="1" stroke="#164e63" fill="#164e63" fillOpacity={0.6} />
                <Area
                  type="monotone"
                  dataKey="aprovadas"
                  stackId="2"
                  stroke="#ea580c"
                  fill="#ea580c"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="implementadas"
                  stackId="3"
                  stroke="#4b5563"
                  fill="#4b5563"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Categoria</CardTitle>
            <CardDescription>Percentual de ideias por área de atuação</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Department Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Performance por Departamento</CardTitle>
          <CardDescription>Ideias submetidas e aprovadas por área</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentData}>
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
            <CardDescription>Colaboradores com mais ideias aprovadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Ana Silva", department: "P&D", ideas: 12, approved: 8 },
                { name: "Carlos Santos", department: "TI", ideas: 10, approved: 7 },
                { name: "Maria Oliveira", department: "Produção", ideas: 8, approved: 6 },
                { name: "João Costa", department: "Marketing", ideas: 7, approved: 5 },
                { name: "Pedro Lima", department: "RH", ideas: 6, approved: 4 },
              ].map((person, index) => (
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
            <CardDescription>Projetos com maior impacto potencial</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
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
              ].map((idea, index) => (
                <div key={index} className="p-3 border rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant={idea.impact === "Alto" ? "default" : "secondary"}>{idea.impact} Impacto</Badge>
                    <Badge variant="outline">{idea.status}</Badge>
                  </div>
                  <h4 className="font-medium text-sm">{idea.title}</h4>
                  <p className="text-xs text-muted-foreground">Por {idea.author}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}