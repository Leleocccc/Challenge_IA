"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Eye, MessageSquare, Plus, TrendingUp, XCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { useIdeas } from "@/contexts/ideas-context"

// Ícones de status para as ideias
const statusIcons = {
  "Em Avaliação": Clock,
  Aprovada: CheckCircle,
  "Em Desenvolvimento": TrendingUp,
  Rejeitada: XCircle,
}

export default function MyIdeas() {
  const router = useRouter();
  const { user } = useAuth()
  const { getUserIdeas } = useIdeas();
  
  // Estados para filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  
  // Obter ideias do usuário
  const userIdeas = getUserIdeas(user?.id || "");
  
  // Aplicar filtros
  const filteredIdeas = userIdeas.filter(idea => {
    const matchesSearch = idea.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         idea.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter && statusFilter !== "all" ? idea.status === statusFilter : true;
    const matchesCategory = categoryFilter && categoryFilter !== "all" ? idea.category === categoryFilter : true;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });
  
  // Navegar para nova ideia
  const handleNewIdea = () => {
    router.push("/submit-idea");
  };
  
  return (
    <div className="p-6 space-y-8 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="eurofarma-header eurofarma-gradient-text">Minhas Ideias</h1>
          <p className="eurofarma-subheader">Acompanhe o status das suas submissões • Movidos pela vida</p>
        </div>
        <Button className="eurofarma-button-primary" onClick={handleNewIdea}>
          <Plus className="h-4 w-4 mr-2" />
          Nova Ideia
        </Button>
      </div>

      {/* Filters */}
      <div className="eurofarma-card">
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Input 
                  placeholder="Buscar ideias..." 
                  className="pl-10 border-gray-300 focus:border-primary focus:ring-primary" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48 border-gray-300 focus:border-primary focus:ring-primary">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Status</SelectItem>
                <SelectItem value="Em Avaliação">Em Avaliação</SelectItem>
                <SelectItem value="Aprovada">Aprovada</SelectItem>
                <SelectItem value="Em Desenvolvimento">Em Desenvolvimento</SelectItem>
                <SelectItem value="Rejeitada">Rejeitada</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48 border-gray-300 focus:border-primary focus:ring-primary">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Categorias</SelectItem>
                <SelectItem value="Tecnologia">Tecnologia</SelectItem>
                <SelectItem value="Sustentabilidade">Sustentabilidade</SelectItem>
                <SelectItem value="Saúde Digital">Saúde Digital</SelectItem>
                <SelectItem value="Processos">Processos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Ideas List */}
      <div className="space-y-6">
        {filteredIdeas.length > 0 ? (
          filteredIdeas.map((idea) => {
            const StatusIcon = statusIcons[idea.status as keyof typeof statusIcons]

            return (
              <div key={idea.id} className="eurofarma-card hover:shadow-xl transition-all duration-300">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-xl font-bold text-gray-900">{idea.title}</h3>
                        <div className="eurofarma-innovation-badge">
                          {idea.category}
                        </div>
                      </div>
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <span>Enviada em {new Date(idea.submittedAt).toLocaleDateString('pt-BR')}</span>
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{idea.views || 0}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>{idea.comments || 0}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <StatusIcon className="h-5 w-5" />
                      <Badge 
                        className={idea.status === "Em Avaliação" ? "bg-yellow-100 text-yellow-800 border-yellow-200" :
                                  idea.status === "Aprovada" ? "bg-green-100 text-green-800 border-green-200" :
                                  idea.status === "Em Desenvolvimento" ? "bg-blue-100 text-blue-800 border-blue-200" :
                                  "bg-red-100 text-red-800 border-red-200"}
                      >
                        {idea.status}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-4">{idea.description}</p>

                  {/* Feedback Section */}
                  {idea.feedback && (
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 mb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <MessageSquare className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium text-gray-900">Último Feedback</span>
                      </div>
                      <p className="text-sm text-gray-600">{idea.feedback}</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center space-x-3">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="eurofarma-button-primary"
                      onClick={() => router.push(`/idea-details/${idea.id}`)}
                    >
                      Ver Detalhes
                    </Button>
                    <Button variant="outline" size="sm" className="hover:bg-gray-50">
                      Comentários ({idea.comments || 0})
                    </Button>
                    {idea.status === "Rejeitada" && (
                      <Button variant="outline" size="sm" className="text-secondary hover:bg-secondary/10">
                        Reenviar
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <div className="eurofarma-card text-center p-12">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhuma ideia encontrada</h3>
              <p className="text-gray-600 mb-6">Nenhuma ideia encontrada com os filtros selecionados.</p>
            </div>
            <Button 
              className="eurofarma-button-primary"
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("");
                setCategoryFilter("");
              }}
            >
              Limpar Filtros
            </Button>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="eurofarma-card">
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Resumo das Suas Ideias</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{userIdeas.length}</div>
              <div className="text-sm font-medium text-gray-600">Total de Ideias</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">
                {userIdeas.filter(idea => idea.status === "Em Avaliação").length}
              </div>
              <div className="text-sm font-medium text-gray-600">Em Avaliação</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {userIdeas.filter(idea => idea.status === "Aprovada" || idea.status === "Em Desenvolvimento").length}
              </div>
              <div className="text-sm font-medium text-gray-600">Aprovadas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {userIdeas.length > 0 
                  ? `${Math.round((userIdeas.filter(idea => idea.status === "Aprovada" || idea.status === "Em Desenvolvimento").length / userIdeas.length) * 100)}%` 
                  : "0%"}
              </div>
              <div className="text-sm font-medium text-gray-600">Taxa de Sucesso</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
