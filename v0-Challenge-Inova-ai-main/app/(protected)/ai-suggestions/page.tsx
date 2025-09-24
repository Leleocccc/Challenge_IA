"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Clock, Users, TrendingUp, Lightbulb, RefreshCw, MessageSquare } from "lucide-react"
import ChatComponent from "@/components/ai-chat/chat-component"

export default function AISuggestionsPage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [showChat, setShowChat] = useState(false)

  const suggestions = [
    {
      id: 1,
      title: "Sistema de Monitoramento de Qualidade em Tempo Real",
      description:
        "Implementar sensores IoT para monitoramento contínuo da qualidade dos medicamentos durante a produção, utilizando machine learning para detectar anomalias.",
      category: "Tecnologia",
      priority: "Alta",
      estimatedImpact: "Redução de 30% nos defeitos de produção",
      department: "Produção",
      complexity: "Média",
      timeframe: "6-12 meses",
      confidence: 92,
    },
    {
      id: 2,
      title: "Plataforma de Telemedicina para Acompanhamento de Pacientes",
      description:
        "Desenvolver uma plataforma digital para acompanhamento remoto de pacientes em tratamento, com integração de dados de dispositivos wearables.",
      category: "Saúde Digital",
      priority: "Alta",
      estimatedImpact: "Melhoria de 40% na aderência ao tratamento",
      department: "Médico",
      complexity: "Alta",
      timeframe: "12-18 meses",
      confidence: 87,
    },
    {
      id: 3,
      title: "Otimização da Cadeia de Suprimentos com IA",
      description:
        "Utilizar algoritmos de IA para prever demanda e otimizar estoques, reduzindo custos e melhorando a disponibilidade de produtos.",
      category: "Logística",
      priority: "Média",
      estimatedImpact: "Redução de 25% nos custos de estoque",
      department: "Supply Chain",
      complexity: "Média",
      timeframe: "8-14 meses",
      confidence: 89,
    },
    {
      id: 4,
      title: "Programa de Sustentabilidade com Blockchain",
      description:
        "Implementar rastreabilidade completa da cadeia produtiva usando blockchain para garantir sustentabilidade e transparência.",
      category: "Sustentabilidade",
      priority: "Média",
      estimatedImpact: "Certificação ESG completa",
      department: "Sustentabilidade",
      complexity: "Alta",
      timeframe: "18-24 meses",
      confidence: 78,
    },
  ]

  const handleGenerateNew = () => {
    setIsGenerating(true)
    setTimeout(() => setIsGenerating(false), 2000)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Alta":
        return "bg-red-100 text-red-800"
      case "Média":
        return "bg-yellow-100 text-yellow-800"
      case "Baixa":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "Alta":
        return "bg-purple-100 text-purple-800"
      case "Média":
        return "bg-blue-100 text-blue-800"
      case "Baixa":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6 space-y-8 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="eurofarma-header eurofarma-gradient-text">IA Sugestões</h1>
          <p className="eurofarma-subheader">Projetos inovadores sugeridos pela inteligência artificial • Movidos pela vida</p>
        </div>
        <div className="flex space-x-3">
          <Button onClick={() => setShowChat(!showChat)} className="eurofarma-button-secondary">
            <MessageSquare className="h-4 w-4 mr-2" />
            {showChat ? "Fechar Chat" : "Abrir Chat de IA"}
          </Button>
          <Button onClick={handleGenerateNew} disabled={isGenerating} className="eurofarma-button-primary">
            {isGenerating ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Gerando...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Gerar Novas Sugestões
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Chat Component */}
      {showChat && (
        <div className="mb-6">
          <Card className="border-green-200 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-green-600" />
                Chat de IA para Ideias Inovadoras
              </CardTitle>
              <CardDescription>
                Converse com nossa IA para obter sugestões personalizadas de ideias inovadoras para o seu negócio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChatComponent />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="eurofarma-metric-card">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-full bg-secondary/10">
              <Lightbulb className="h-6 w-6 text-secondary" />
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-secondary">24</div>
              <p className="text-sm font-medium text-gray-600">Sugestões Ativas</p>
            </div>
          </div>
          <p className="text-xs text-gray-500">Ideias em desenvolvimento</p>
        </div>

        <div className="eurofarma-metric-card">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-full bg-green-100">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600">87%</div>
              <p className="text-sm font-medium text-gray-600">Taxa de Sucesso</p>
            </div>
          </div>
          <p className="text-xs text-gray-500">Ideias aprovadas</p>
        </div>

        <div className="eurofarma-metric-card">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">12</div>
              <p className="text-sm font-medium text-gray-600">Implementadas</p>
            </div>
          </div>
          <p className="text-xs text-gray-500">Projetos em produção</p>
        </div>

        <div className="eurofarma-metric-card">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-full bg-yellow-100">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-yellow-600">8</div>
              <p className="text-sm font-medium text-gray-600">Em Análise</p>
            </div>
          </div>
          <p className="text-xs text-gray-500">Aguardando avaliação</p>
        </div>
      </div>

      {/* AI Suggestions List */}
      <div className="space-y-6">
        {suggestions.map((suggestion) => (
          <div key={suggestion.id} className="eurofarma-card hover:shadow-xl transition-all duration-300">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{suggestion.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{suggestion.description}</p>
                </div>
                <div className="flex items-center space-x-2 ml-6">
                  <div className="eurofarma-innovation-badge">
                    {suggestion.confidence}% confiança
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Categoria</p>
                  <div className="eurofarma-innovation-badge">
                    {suggestion.category}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Prioridade</p>
                  <Badge className={`${getPriorityColor(suggestion.priority)}`}>{suggestion.priority}</Badge>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Complexidade</p>
                  <Badge className={`${getComplexityColor(suggestion.complexity)}`}>{suggestion.complexity}</Badge>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Prazo Estimado</p>
                  <p className="text-sm text-gray-600">{suggestion.timeframe}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Impacto Estimado</p>
                  <p className="text-sm text-gray-600">{suggestion.estimatedImpact}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Departamento Sugerido</p>
                  <p className="text-sm text-gray-600">{suggestion.department}</p>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button size="sm" className="eurofarma-button-primary">
                  Submeter como Ideia
                </Button>
                <Button size="sm" variant="outline" className="hover:bg-gray-50">
                  Salvar para Depois
                </Button>
                <Button size="sm" variant="outline" className="hover:bg-gray-50">
                  Compartilhar
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}