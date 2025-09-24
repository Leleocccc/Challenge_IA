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
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">IA Sugestões</h1>
          <p className="text-gray-600 mt-1">Projetos inovadores sugeridos pela inteligência artificial</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => setShowChat(!showChat)} className="bg-green-600 hover:bg-green-700">
            <MessageSquare className="h-4 w-4 mr-2" />
            {showChat ? "Fechar Chat" : "Abrir Chat de IA"}
          </Button>
          <Button onClick={handleGenerateNew} disabled={isGenerating} className="bg-blue-600 hover:bg-blue-700">
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-sm text-gray-600">Sugestões Ativas</p>
                <p className="text-2xl font-bold">24</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Taxa de Sucesso</p>
                <p className="text-2xl font-bold">87%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Implementadas</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm text-gray-600">Em Análise</p>
                <p className="text-2xl font-bold">8</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Suggestions List */}
      <div className="space-y-4">
        {suggestions.map((suggestion) => (
          <Card key={suggestion.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg text-gray-900">{suggestion.title}</CardTitle>
                  <CardDescription className="mt-2 text-gray-600">{suggestion.description}</CardDescription>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    {suggestion.confidence}% confiança
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Categoria</p>
                  <Badge variant="outline" className="mt-1">
                    {suggestion.category}
                  </Badge>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700">Prioridade</p>
                  <Badge className={`mt-1 ${getPriorityColor(suggestion.priority)}`}>{suggestion.priority}</Badge>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700">Complexidade</p>
                  <Badge className={`mt-1 ${getComplexityColor(suggestion.complexity)}`}>{suggestion.complexity}</Badge>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700">Prazo Estimado</p>
                  <p className="text-sm text-gray-600 mt-1">{suggestion.timeframe}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Impacto Estimado</p>
                  <p className="text-sm text-gray-600 mt-1">{suggestion.estimatedImpact}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700">Departamento Sugerido</p>
                  <p className="text-sm text-gray-600 mt-1">{suggestion.department}</p>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Submeter como Ideia
                </Button>
                <Button size="sm" variant="outline">
                  Salvar para Depois
                </Button>
                <Button size="sm" variant="outline">
                  Compartilhar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}