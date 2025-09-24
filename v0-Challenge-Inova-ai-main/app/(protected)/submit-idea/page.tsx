"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Lightbulb, Sparkles, FileText, DollarSign, CheckCircle, ArrowRight } from "lucide-react"
import cn from "classnames"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { useIdeas } from "@/contexts/ideas-context"

export default function SubmitIdea() {
  const router = useRouter()
  const { user } = useAuth()
  const { addIdea } = useIdeas()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    problem: "",
    solution: "",
    impact: "",
    resources: "",
    timeline: "",
  })
  
  const handleSubmit = () => {
    // Verificar se todos os campos obrigatórios estão preenchidos
    const requiredFields = ['title', 'category', 'description', 'problem', 'solution', 'impact'] as const;
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      alert("Por favor, preencha todos os campos obrigatórios antes de enviar.");
      return;
    }
    
    // Indicar que está enviando
    setIsSubmitting(true)
    
    // Criar a nova ideia
    const newIdea = {
      id: Date.now().toString(),
      userId: user?.id || "",
      title: formData.title,
      category: formData.category,
      description: formData.description,
      problem: formData.problem,
      solution: formData.solution,
      impact: formData.impact,
      resources: formData.resources,
      timeline: formData.timeline,
      status: "Em Avaliação",
      submittedAt: new Date().toISOString(),
      views: 0,
      comments: 0,
      feedback: ""
    };
    
    // Adicionar a ideia ao contexto
    addIdea(newIdea);
    
    // Simular um tempo de processamento e depois redirecionar
    setTimeout(() => {
      // Redirecionar para a página de minhas ideias após o envio
      router.push("/my-ideas")
    }, 1000)
  }

  const steps = [
    { number: 1, title: "Informações Básicas", icon: FileText },
    { number: 2, title: "Detalhamento", icon: Lightbulb },
    { number: 3, title: "Impacto e Recursos", icon: DollarSign },
    { number: 4, title: "Revisão", icon: CheckCircle },
  ]

  const categories = [
    "Tecnologia e Inovação",
    "Sustentabilidade",
    "Processos e Operações",
    "Produtos e Serviços",
    "Recursos Humanos",
    "Saúde e Segurança",
    "Marketing e Vendas",
    "Pesquisa e Desenvolvimento",
  ]

  const handleNext = () => {
    // Validação básica por etapa
    if (currentStep === 1) {
      // Verificar se os campos obrigatórios da etapa 1 estão preenchidos
      if (!formData.title || !formData.category || !formData.description) {
        alert("Por favor, preencha todos os campos obrigatórios.")
        return
      }
    } else if (currentStep === 2) {
      // Verificar se os campos obrigatórios da etapa 2 estão preenchidos
      if (!formData.problem || !formData.solution) {
        alert("Por favor, preencha todos os campos obrigatórios.")
        return
      }
    } else if (currentStep === 3) {
      // Verificar se os campos obrigatórios da etapa 3 estão preenchidos
      if (!formData.impact) {
        alert("Por favor, preencha o campo de impacto esperado.")
        return
      }
    }
    
    // Se passou pela validação, avança para a próxima etapa
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }
  
  const handleCancel = () => {
    // Redirecionar para o dashboard
    router.push("/dashboard")
  }
  
  const handleImportAISuggestion = () => {
    // Simular a importação de uma sugestão da IA
    const aiSuggestion = {
      title: "Sistema de Monitoramento de Eficiência Energética",
      category: "Sustentabilidade",
      description: "Plataforma para monitorar e otimizar o consumo de energia em todas as instalações da empresa.",
      problem: "Atualmente, não temos visibilidade em tempo real do consumo energético em nossas instalações, o que dificulta a identificação de desperdícios e oportunidades de economia.",
      solution: "Implementar sensores IoT conectados a uma plataforma centralizada que monitora o consumo em tempo real e utiliza IA para identificar padrões e sugerir otimizações.",
      impact: "Redução estimada de 15-20% no consumo energético, diminuição da pegada de carbono e economia significativa em custos operacionais.",
      resources: "Equipe de TI, sensores IoT, desenvolvimento de software, consultoria em eficiência energética.",
      timeline: "6-12-months"
    }
    // Corrige possíveis valores vazios
    setFormData({
      ...aiSuggestion,
      category: aiSuggestion.category && aiSuggestion.category.trim() !== '' ? aiSuggestion.category : '',
      timeline: aiSuggestion.timeline && aiSuggestion.timeline.trim() !== '' ? aiSuggestion.timeline : '',
    })
    
    // Voltar para a primeira etapa para que o usuário possa revisar
    setCurrentStep(1)
    
    // Mostrar mensagem de sucesso
    alert("Sugestão da IA importada com sucesso! Revise e personalize conforme necessário.")
  }

  const progress = (currentStep / 4) * 100

  const CurrentStepIcon = steps[currentStep - 1].icon

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      {/* Header */}
      <div className="text-center space-y-6">
        <div>
          <h1 className="eurofarma-header eurofarma-gradient-text">Nova Ideia</h1>
          <p className="eurofarma-subheader">Compartilhe sua ideia inovadora • Movidos pela vida</p>
        </div>
        <div className="flex justify-center gap-3">
          <Button 
            variant="outline" 
            className="eurofarma-button-secondary flex items-center gap-2"
            onClick={() => router.push("/ai-suggestions")}
          >
            <Sparkles className="h-4 w-4" />
            Buscar inspiração com IA
          </Button>
          <Button 
            variant="outline" 
            className="eurofarma-button-primary flex items-center gap-2"
            onClick={handleImportAISuggestion}
          >
            <Lightbulb className="h-4 w-4" />
            Importar sugestão de IA
          </Button>
        </div>
      </div>

      {/* Progress */}
      <div className="eurofarma-card">
        <div className="p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-900">Progresso</span>
              <span className="text-sm text-gray-600">Etapa {currentStep} de 4</span>
            </div>
            <Progress value={progress} className="h-3 bg-gray-200" />

            {/* Steps */}
            <div className="flex items-center justify-between">
              {steps.map((step) => {
                const StepIcon = step.icon
                return (
                  <div key={step.number} className="flex flex-col items-center space-y-3">
                    <div
                      className={cn(
                        "flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300",
                        currentStep >= step.number
                          ? "bg-primary border-primary text-white shadow-md"
                          : "border-gray-300 text-gray-400 bg-white",
                      )}
                    >
                      <StepIcon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-medium text-center max-w-24 text-gray-700">{step.title}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Form Steps */}
      <div className="eurofarma-card">
        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 rounded-full bg-primary/10">
                <CurrentStepIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">{steps[currentStep - 1].title}</h3>
            </div>
            <p className="text-gray-600">
              {currentStep === 1 && "Vamos começar com as informações básicas da sua ideia"}
              {currentStep === 2 && "Agora detalhe melhor sua proposta"}
              {currentStep === 3 && "Qual o impacto esperado e recursos necessários?"}
              {currentStep === 4 && "Revise todas as informações antes de enviar"}
            </p>
          </div>
          <div className="space-y-6">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título da Ideia *</Label>
                <Input
                  id="title"
                  placeholder="Ex: Sistema de rastreamento inteligente de medicamentos"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Categoria *</Label>
                <Select
                  value={formData.category && formData.category.trim() !== '' ? formData.category : undefined}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories
                      .filter((category) => typeof category === 'string' && category.trim() !== '')
                      .map((category) => (
                        <SelectItem key={category} value={category || "default-value"}>
                          {category}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição Resumida *</Label>
                <Textarea
                  id="description"
                  placeholder="Descreva sua ideia em poucas palavras..."
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              {/* AI Suggestion */}
              <div className="p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-primary/20">
                <div className="flex items-center space-x-2 mb-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-gray-900">Sugestão da IA</span>
                </div>
                <p className="text-sm text-gray-600">
                  Com base no título, sugerimos adicionar tags: #IoT #Blockchain #Rastreabilidade
                </p>
              </div>
            </div>
          )}

          {/* Step 2: Details */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="problem">Problema Identificado *</Label>
                <Textarea
                  id="problem"
                  placeholder="Qual problema sua ideia resolve?"
                  rows={4}
                  value={formData.problem}
                  onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="solution">Solução Proposta *</Label>
                <Textarea
                  id="solution"
                  placeholder="Como sua ideia resolve o problema?"
                  rows={4}
                  value={formData.solution}
                  onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                />
              </div>
            </div>
          )}

          {/* Step 3: Impact & Resources */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="impact">Impacto Esperado *</Label>
                <Textarea
                  id="impact"
                  placeholder="Qual o impacto esperado para a empresa?"
                  rows={3}
                  value={formData.impact}
                  onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="resources">Recursos Necessários</Label>
                <Textarea
                  id="resources"
                  placeholder="Quais recursos seriam necessários para implementar?"
                  rows={3}
                  value={formData.resources}
                  onChange={(e) => setFormData({ ...formData, resources: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeline">Prazo Estimado</Label>
                <Select
                  value={formData.timeline && formData.timeline.trim() !== '' ? formData.timeline : undefined}
                  onValueChange={(value) => setFormData({ ...formData, timeline: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um prazo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-3-months">1-3 meses</SelectItem>
                    <SelectItem value="3-6-months">3-6 meses</SelectItem>
                    <SelectItem value="6-12-months">6-12 meses</SelectItem>
                    <SelectItem value="1-year-plus">Mais de 1 ano</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Título</Label>
                  <p className="text-sm bg-muted p-2 rounded">{formData.title || "Não informado"}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Categoria</Label>
                  <p className="text-sm bg-muted p-2 rounded">{formData.category || "Não informado"}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Descrição</Label>
                <p className="text-sm bg-muted p-2 rounded">{formData.description || "Não informado"}</p>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Problema</Label>
                <p className="text-sm bg-muted p-2 rounded">{formData.problem || "Não informado"}</p>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Solução</Label>
                <p className="text-sm bg-muted p-2 rounded">{formData.solution || "Não informado"}</p>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={handlePrevious} 
                disabled={currentStep === 1}
                className="hover:bg-gray-50"
              >
                Anterior
              </Button>
              <Button 
                variant="ghost" 
                onClick={handleCancel} 
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
            </div>

            {currentStep < 4 ? (
              <Button 
                onClick={handleNext}
                className="eurofarma-button-primary"
              >
                Próximo
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button 
                className="eurofarma-button-primary" 
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Enviar Ideia"}
                {!isSubmitting && <CheckCircle className="h-4 w-4 ml-2" />}
              </Button>
            )}
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}
