"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, Clock, Eye, MessageSquare, ArrowLeft, ThumbsUp, Share2, TrendingUp, XCircle } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useIdeas } from "@/contexts/ideas-context"

// Ícones de status para as ideias
const statusIcons = {
  "Em Avaliação": Clock,
  Aprovada: CheckCircle,
  "Em Desenvolvimento": TrendingUp,
  Rejeitada: XCircle,
}

export default function IdeaDetails() {
  const router = useRouter()
  const params = useParams()
  const { user } = useAuth()
  const { getAllIdeas } = useIdeas()
  
  const [idea, setIdea] = useState(null)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  useEffect(() => {
    const ideas = getAllIdeas()
    const foundIdea = ideas.find(i => i.id === params.id)
    
    if (foundIdea) {
      setIdea(foundIdea)
    } else {
      // Ideia não encontrada, redirecionar para a página de ideias
      router.push("/my-ideas")
    }
  }, [params.id, getAllIdeas, router])
  
  const handleSubmitComment = (e) => {
    e.preventDefault()
    if (!comment.trim()) return
    
    setIsSubmitting(true)
    
    // Simulação de envio de comentário
    setTimeout(() => {
      setComment("")
      setIsSubmitting(false)
      // Aqui você adicionaria a lógica para salvar o comentário
    }, 1000)
  }
  
  if (!idea) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex items-center space-x-2 mb-6">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </div>
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">Carregando detalhes da ideia...</p>
          </CardContent>
        </Card>
      </div>
    )
  }
  
  const StatusIcon = statusIcons[idea.status]
  
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Navigation */}
      <div className="flex items-center space-x-2 mb-6">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
      </div>
      
      {/* Idea Header */}
      <Card>
        <CardHeader>
          <div className="flex flex-col space-y-4 md:flex-row md:items-start md:justify-between md:space-y-0">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <CardTitle className="text-2xl">{idea.title}</CardTitle>
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
              <StatusIcon className="h-5 w-5" />
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
        <CardContent className="space-y-6">
          {/* Author Info */}
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={idea.authorAvatar || "/placeholder.svg"} alt={idea.authorName} />
              <AvatarFallback>
                {idea.authorName
                  ? idea.authorName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                  : "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{idea.authorName || "Usuário"}</p>
              <p className="text-sm text-muted-foreground">Autor da ideia</p>
            </div>
          </div>
          
          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Descrição</h3>
            <p className="text-muted-foreground">{idea.description}</p>
          </div>
          
          {/* Problem & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Problema</h3>
              <p className="text-muted-foreground">{idea.problem}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Solução Proposta</h3>
              <p className="text-muted-foreground">{idea.solution}</p>
            </div>
          </div>
          
          {/* Impact & Resources */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Impacto Esperado</h3>
              <p className="text-muted-foreground">{idea.impact}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Recursos Necessários</h3>
              <p className="text-muted-foreground">{idea.resources}</p>
            </div>
          </div>
          
          {/* Timeline */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Cronograma Estimado</h3>
            <p className="text-muted-foreground">{idea.timeline}</p>
          </div>
          
          {/* Feedback Section */}
          {idea.feedback && (
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Feedback da Avaliação</span>
              </div>
              <p className="text-muted-foreground">{idea.feedback}</p>
            </div>
          )}
          
          {/* Actions */}
          <div className="flex items-center space-x-3 pt-4">
            <Button variant="outline" size="sm" className="gap-2">
              <ThumbsUp className="h-4 w-4" />
              Apoiar Ideia
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Share2 className="h-4 w-4" />
              Compartilhar
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Comments Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Comentários</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Comment Form */}
          <form onSubmit={handleSubmitComment} className="space-y-3">
            <Textarea 
              placeholder="Adicione um comentário..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-24"
            />
            <Button 
              type="submit" 
              disabled={isSubmitting || !comment.trim()}
              className="ml-auto"
            >
              {isSubmitting ? "Enviando..." : "Enviar Comentário"}
            </Button>
          </form>
          
          {/* Comments List */}
          <div className="space-y-4 pt-4">
            {idea.comments && idea.comments.length > 0 ? (
              idea.comments.map((comment, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-3 mb-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={comment.authorAvatar || "/placeholder.svg"} alt={comment.authorName} />
                      <AvatarFallback>
                        {comment.authorName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{comment.authorName}</p>
                      <p className="text-xs text-muted-foreground">{new Date(comment.createdAt).toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{comment.text}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Nenhum comentário ainda. Seja o primeiro a comentar!</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}