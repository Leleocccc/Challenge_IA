"use client"

import React, { useState } from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, Award, Plus, Eye, Star, Sparkles, MessageSquare } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { useIdeas } from "@/contexts/ideas-context"

export default function Dashboard() {
  const router = useRouter()
  const { user } = useAuth()
  const { getAllIdeas, getUserIdeas } = useIdeas()
  
  const [filters, setFilters] = useState({
    ideaStatus: "all",
    category: "all",
    aiCategory: "all"
  })

  // Obter todas as ideias do contexto
  const allIdeas = getAllIdeas()
  const userIdeas = getUserIdeas(user?.id || "")
  
  // Mapear status para os valores usados na UI
  const statusMap = {
    "Em Avaliação": "analysis",
    "Aprovada": "approved",
    "Em Desenvolvimento": "development",
    "Rejeitada": "rejected"
  }
  
  // Reverter o mapeamento para exibição
  const reverseStatusMap = {
    "analysis": "Em Avaliação",
    "approved": "Aprovada",
    "development": "Em Desenvolvimento",
    "rejected": "Rejeitada"
  }

  // Dados de exemplo para sugestões de IA
  const aiSuggestionsData = [
    { id: 1, title: "Sistema de monitoramento de eficiência energética", category: "sustainability", description: "Baseado no seu interesse em sustentabilidade, a IA sugere um sistema para monitorar e otimizar o consumo de energia nas instalações da empresa." },
    { id: 2, title: "Aplicativo de colaboração em tempo real", category: "technology", description: "Uma ferramenta para facilitar a colaboração entre equipes remotas com recursos de edição simultânea e comunicação integrada." },
    { id: 3, title: "Otimização da cadeia de suprimentos", category: "process", description: "Um sistema inteligente para prever demandas e otimizar o estoque, reduzindo custos e melhorando a eficiência." },
    { id: 4, title: "Embalagens biodegradáveis", category: "product", description: "Desenvolvimento de embalagens sustentáveis para reduzir o impacto ambiental dos produtos." },
  ]

  // Filtragem de ideias recentes
  const filteredIdeas = allIdeas.filter(idea => {
    const statusMatch = filters.ideaStatus === "all" || 
      (filters.ideaStatus === "approved" && idea.status === "Aprovada") ||
      (filters.ideaStatus === "analysis" && idea.status === "Em Avaliação") ||
      (filters.ideaStatus === "development" && idea.status === "Em Desenvolvimento") ||
      (filters.ideaStatus === "rejected" && idea.status === "Rejeitada")
    
    const categoryMatch = filters.category === "all" || idea.category === filters.category
    
    return statusMatch && categoryMatch
  })

  // Filtragem de sugestões de IA
  const filteredAiSuggestions = aiSuggestionsData.filter(suggestion => {
    return filters.aiCategory === "all" || suggestion.category === filters.aiCategory
  })

  const handleNewIdea = () => {
    router.push("/submit-idea")
  }

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }))
  }

  return (
    <div className="p-6 space-y-8 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="eurofarma-header eurofarma-gradient-text">
            Bem-vindo, {user?.name || "Colaborador"}!
          </h1>
          <p className="eurofarma-subheader">
            Movidos pela vida • Portal de Inovação Eurofarma
          </p>
        </div>
        <Button className="eurofarma-button-primary" onClick={handleNewIdea}>
          <Plus className="h-4 w-4 mr-2" />
          Nova Ideia
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="eurofarma-metric-card cursor-pointer hover:shadow-xl transition-all duration-300" onClick={() => router.push("/my-ideas")}>
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <Lightbulb className="h-6 w-6 text-primary" />
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">{userIdeas.length}</div>
              <p className="text-sm font-medium text-gray-600">Minhas Ideias</p>
            </div>
          </div>
          <p className="text-xs text-gray-500">{userIdeas.length > 0 ? `Última em ${new Date(userIdeas[0].submittedAt).toLocaleDateString('pt-BR')}` : 'Nenhuma ideia ainda'}</p>
        </div>

        <div className="eurofarma-metric-card cursor-pointer hover:shadow-xl transition-all duration-300" onClick={() => router.push("/my-ideas")}>
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-full bg-yellow-100">
              <Eye className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-yellow-600">{userIdeas.filter(idea => idea.status === "Em Avaliação").length}</div>
              <p className="text-sm font-medium text-gray-600">Em Avaliação</p>
            </div>
          </div>
          <p className="text-xs text-gray-500">Aguardando feedback</p>
        </div>

        <div className="eurofarma-metric-card cursor-pointer hover:shadow-xl transition-all duration-300" onClick={() => router.push("/leaderboard")}>
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-full bg-secondary/10">
              <Star className="h-6 w-6 text-secondary" />
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-secondary">2,450</div>
              <p className="text-sm font-medium text-gray-600">Pontos</p>
            </div>
          </div>
          <p className="text-xs text-gray-500">Ranking #8</p>
        </div>

        <div className="eurofarma-metric-card cursor-pointer hover:shadow-xl transition-all duration-300" onClick={() => router.push("/my-ideas")}>
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-full bg-green-100">
              <Award className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600">{userIdeas.filter(idea => idea.status === "Aprovada" || idea.status === "Em Desenvolvimento").length}</div>
              <p className="text-sm font-medium text-gray-600">Aprovadas</p>
            </div>
          </div>
          <p className="text-xs text-gray-500">{userIdeas.filter(idea => idea.status === "Em Desenvolvimento").length} em implementação</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Ideas */}
        <div className="eurofarma-card">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Ideias Recentes</h3>
                <p className="text-gray-600">Últimas ideias submetidas na plataforma</p>
              </div>
              <div className="flex space-x-2">
                <select 
                  className="h-8 rounded-md border border-input bg-background px-2 py-1 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  value={filters.ideaStatus}
                  onChange={(e) => handleFilterChange("ideaStatus", e.target.value)}
                >
                  <option value="all">Todos os status</option>
                  <option value="approved">Aprovadas</option>
                  <option value="analysis">Em Análise</option>
                  <option value="development">Em Desenvolvimento</option>
                  <option value="rejected">Rejeitadas</option>
                </select>
                <select 
                  className="h-8 rounded-md border border-input bg-background px-2 py-1 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  value={filters.category}
                  onChange={(e) => handleFilterChange("category", e.target.value)}
                >
                  <option value="all">Todas as categorias</option>
                  <option value="Tecnologia">Tecnologia</option>
                  <option value="Sustentabilidade">Sustentabilidade</option>
                  <option value="Saúde Digital">Saúde Digital</option>
                  <option value="Processos">Processos</option>
                  <option value="Produto">Produto</option>
                  <option value="Serviço">Serviço</option>
                </select>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            {filteredIdeas.length > 0 ? filteredIdeas.map((idea, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:shadow-md transition-shadow" onClick={() => router.push(`/idea-details/${idea.id}`)}>
                <div className="space-y-1">
                  <p className="font-medium text-sm">{idea.title}</p>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="text-xs">
                      {idea.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{new Date(idea.submittedAt).toLocaleDateString('pt-BR')}</span>
                    <span className="text-xs text-muted-foreground">Por {idea.authorName}</span>
                  </div>
                </div>
                <Badge variant={idea.status === "Aprovada" ? "default" : "outline"} className={cn(
                  "text-xs",
                  idea.status === "Aprovada" && "bg-green-100 text-green-800",
                  idea.status === "Em Avaliação" && "bg-yellow-100 text-yellow-800",
                  idea.status === "Em Desenvolvimento" && "bg-blue-100 text-blue-800",
                  idea.status === "Rejeitada" && "bg-red-100 text-red-800"
                )}>
                  {idea.status}
                </Badge>
              </div>
            )) : (
              <div className="text-center py-4 text-muted-foreground">
                Nenhuma ideia encontrada com os filtros selecionados.
              </div>
            )}
          </div>
        </div>

        {/* Gamification Progress */}
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => router.push("/leaderboard")}>
          <CardHeader>
            <CardTitle>Progresso e Conquistas</CardTitle>
            <CardDescription>Seu desenvolvimento no programa de inovação</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Level Progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Nível Inovador</span>
                <span className="text-sm text-muted-foreground">Nível 3</span>
              </div>
              <Progress value={65} className="h-2" />
              <p className="text-xs text-muted-foreground">850/1300 pontos para o próximo nível</p>
            </div>

            {/* Badges */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Badges Conquistadas</h4>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { name: "Primeira Ideia", icon: "🚀", earned: true },
                  { name: "Colaborador", icon: "🤝", earned: true },
                  { name: "Inovador", icon: "💡", earned: true },
                  { name: "Mentor", icon: "🎓", earned: false },
                  { name: "Visionário", icon: "🔮", earned: false },
                  { name: "Líder", icon: "👑", earned: false },
                ].map((badge, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex flex-col items-center p-2 rounded-lg border text-center cursor-pointer hover:bg-primary/5 transition-colors",
                      badge.earned ? "bg-card" : "bg-muted/50 opacity-50",
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (badge.earned) router.push("/badges");
                    }}
                  >
                    <span className="text-lg mb-1">{badge.icon}</span>
                    <span className="text-xs font-medium">{badge.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Suggestions Preview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <span>Sugestões da IA</span>
                <Badge variant="secondary" className="bg-accent text-accent-foreground">
                  Novo
                </Badge>
              </CardTitle>
              <CardDescription>Ideias personalizadas baseadas no seu perfil e área de atuação</CardDescription>
            </div>
            <select 
               className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
               value={filters.aiCategory}
               onChange={(e) => handleFilterChange("aiCategory", e.target.value)}
             >
               <option value="all">Todas as categorias</option>
               <option value="sustainability">Sustentabilidade</option>
               <option value="technology">Tecnologia</option>
               <option value="process">Processos</option>
               <option value="product">Produtos</option>
             </select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAiSuggestions.length > 0 ? filteredAiSuggestions.map((suggestion, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {suggestion.category === "sustainability" ? "Sustentabilidade" : 
                     suggestion.category === "technology" ? "Tecnologia" : 
                     suggestion.category === "process" ? "Processos" : 
                     suggestion.category === "product" ? "Produtos" : suggestion.category}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Relevância Alta
                  </Badge>
                </div>
                <h4 className="font-medium text-sm">{suggestion.title}</h4>
                <p className="text-xs text-muted-foreground">{suggestion.description}</p>
                <Button variant="outline" size="sm" className="w-full mt-2 bg-transparent" onClick={() => router.push("/ai-suggestions")}>
                  Explorar Ideia
                </Button>
              </div>
            )) : (
              <div className="col-span-2 text-center py-4 text-muted-foreground">
                Nenhuma sugestão encontrada com os filtros selecionados.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
