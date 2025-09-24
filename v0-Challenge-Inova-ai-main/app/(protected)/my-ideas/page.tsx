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
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Minhas Ideias</h1>
          <p className="text-muted-foreground">Acompanhe o status das suas submissões</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90" onClick={handleNewIdea}>Nova Ideia</Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Input 
                  placeholder="Buscar ideias..." 
                  className="pl-10" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
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
              <SelectTrigger className="w-full md:w-48">
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
        </CardContent>
      </Card>

      {/* Ideas List */}
      <div className="space-y-4">
        {filteredIdeas.length > 0 ? (
          filteredIdeas.map((idea) => {
            const StatusIcon = statusIcons[idea.status as keyof typeof statusIcons]

            return (
              <Card key={idea.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <CardTitle className="text-lg">{idea.title}</CardTitle>
                        <Badge variant="outline">{idea.category}</Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
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
                      <StatusIcon className="h-4 w-4" />
                      <Badge 
                        className={idea.status === "Em Avaliação" ? "bg-yellow-100 text-yellow-800" :
                                  idea.status === "Aprovada" ? "bg-green-100 text-green-800" :
                                  idea.status === "Em Desenvolvimento" ? "bg-blue-100 text-blue-800" :
                                  "bg-red-100 text-red-800"}
                      >
                        {idea.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{idea.description}</p>

                  {/* Feedback Section */}
                  {idea.feedback && (
                    <div className="p-3 bg-muted rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Último Feedback</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{idea.feedback}</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => router.push(`/idea-details/${idea.id}`)}
                    >
                      Ver Detalhes
                    </Button>
                    <Button variant="outline" size="sm">
                      Comentários ({idea.comments || 0})
                    </Button>
                    {idea.status === "Rejeitada" && (
                      <Button variant="outline" size="sm" className="text-accent bg-transparent">
                        Reenviar
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })
        ) : (
          <Card className="p-6 text-center">
            <p className="text-muted-foreground mb-4">Nenhuma ideia encontrada com os filtros selecionados.</p>
            <Button onClick={() => {
              setSearchTerm("");
              setStatusFilter("");
              setCategoryFilter("");
            }}>
              Limpar Filtros
            </Button>
          </Card>
        )}
      </div>

      {/* Summary Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo das Suas Ideias</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-card-foreground">{userIdeas.length}</div>
              <div className="text-sm text-muted-foreground">Total de Ideias</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {userIdeas.filter(idea => idea.status === "Em Avaliação").length}
              </div>
              <div className="text-sm text-muted-foreground">Em Avaliação</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {userIdeas.filter(idea => idea.status === "Aprovada" || idea.status === "Em Desenvolvimento").length}
              </div>
              <div className="text-sm text-muted-foreground">Aprovadas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {userIdeas.length > 0 
                  ? `${Math.round((userIdeas.filter(idea => idea.status === "Aprovada" || idea.status === "Em Desenvolvimento").length / userIdeas.length) * 100)}%` 
                  : "0%"}
              </div>
              <div className="text-sm text-muted-foreground">Taxa de Sucesso</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
