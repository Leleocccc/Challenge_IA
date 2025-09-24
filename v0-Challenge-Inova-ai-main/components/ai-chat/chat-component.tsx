"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Send, Bot, User } from "lucide-react"

// Tipos para as mensagens do chat
type MessageType = "user" | "ai"

interface Message {
  id: string
  content: string
  type: MessageType
  timestamp: Date
}

// Componente de mensagem individual
const ChatMessage = ({ message }: { message: Message }) => {
  return (
    <div
      className={`flex ${
        message.type === "user" ? "justify-end" : "justify-start"
      } mb-4`}
    >
      <div
        className={`flex items-start max-w-[80%] ${
          message.type === "user"
            ? "bg-blue-600 text-white rounded-tl-lg rounded-tr-lg rounded-bl-lg"
            : "bg-gray-100 text-gray-800 rounded-tl-lg rounded-tr-lg rounded-br-lg"
        } p-3 shadow-sm`}
      >
        <div className="mr-2 mt-1">
          {message.type === "user" ? (
            <User className="h-5 w-5" />
          ) : (
            <Bot className="h-5 w-5" />
          )}
        </div>
        <div>
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          <p className="text-xs opacity-70 mt-1">
            {message.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function ChatComponent() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content:
        "Olá! Sou sua assistente de inovação. Como posso ajudar você a desenvolver ideias inovadoras para o seu negócio hoje?",
      type: "ai",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [usedResponses, setUsedResponses] = useState<Set<string>>(new Set())
  const [conversationContext, setConversationContext] = useState<string[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Função para gerar um ID único para cada mensagem
  const generateId = () => Math.random().toString(36).substring(2, 9)

  // Função para rolar para a última mensagem
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Banco de dados de prompts específicos para ideias de negócios e inovação
  const businessPrompts = [
    {
      keywords: ["tecnologia", "digital", "software", "app", "aplicativo", "sistema"],
      responses: [
        "Que tal desenvolver um sistema de gestão de inovação que permita aos colaboradores submeter e votar em ideias? Isso pode aumentar o engajamento e descobrir talentos ocultos na empresa.",
        "Considere criar um aplicativo interno para facilitar a comunicação entre departamentos e agilizar processos de aprovação de projetos inovadores.",
        "Uma plataforma de análise de dados em tempo real poderia ajudar a identificar tendências de mercado e oportunidades de inovação antes dos concorrentes.",
        "Um sistema de automação de processos repetitivos usando IA poderia liberar tempo da equipe para focar em atividades mais criativas e estratégicas.",
        "Desenvolver uma solução de realidade aumentada para treinamento de funcionários poderia reduzir custos e melhorar a eficiência do aprendizado.",
        "Implementar um chatbot interno para responder perguntas frequentes sobre processos de inovação e facilitar o acesso ao conhecimento organizacional.",
        "Criar uma plataforma de gamificação para incentivar comportamentos inovadores, com rankings, desafios e recompensas para ideias implementadas.",
        "Desenvolver um sistema de reconhecimento facial para melhorar a segurança e personalizar a experiência dos clientes em lojas físicas.",
        "Implementar uma solução de IoT para monitorar em tempo real o uso de recursos e otimizar processos produtivos.",
        "Criar um marketplace interno de habilidades, onde colaboradores podem oferecer e solicitar ajuda em projetos inovadores."
      ]
    },
    {
      keywords: ["rh", "pessoas", "funcionários", "colaboradores", "equipe", "talentos"],
      responses: [
        "Uma ideia interessante seria criar um programa de mentoria reversa, onde funcionários mais jovens orientam os mais experientes em novas tecnologias e tendências de mercado.",
        "Implementar um sistema de reconhecimento baseado em blockchain que recompensa ideias inovadoras com tokens que podem ser trocados por benefícios.",
        "Criar um programa de 'job rotation' temporário entre departamentos para estimular a polinização cruzada de ideias e perspectivas.",
        "Desenvolver um sistema de 'innovation time' onde colaboradores podem dedicar uma porcentagem do tempo de trabalho para projetos pessoais alinhados com os objetivos da empresa.",
        "Implementar um programa de 'intraempreendedorismo' que permite aos funcionários desenvolver suas ideias com recursos da empresa e participar dos resultados.",
        "Criar um programa de 'embaixadores de inovação' em cada departamento, responsáveis por disseminar a cultura de inovação e facilitar projetos interdepartamentais.",
        "Desenvolver um sistema de feedback contínuo e anônimo que permita aos colaboradores compartilhar ideias e preocupações sem receio de julgamento.",
        "Implementar um programa de 'dia de imersão', onde funcionários passam um dia por mês em outro departamento para entender diferentes perspectivas do negócio.",
        "Criar um 'banco de talentos ocultos' que mapeia habilidades não utilizadas no dia a dia dos colaboradores, mas que podem ser valiosas para projetos inovadores.",
        "Desenvolver um programa de 'desafios de inovação' trimestrais com temas específicos e premiações para as melhores soluções implementáveis."
      ]
    },
    {
      keywords: ["processo", "metodologia", "gestão", "gerenciamento", "estrutura", "organização"],
      responses: [
        "Você poderia implementar um laboratório de inovação virtual, onde equipes multidisciplinares trabalham em projetos específicos por tempo limitado, sem afetar suas responsabilidades principais.",
        "Adotar metodologias ágeis como Design Thinking e Lean Startup para acelerar o ciclo de inovação e reduzir o tempo de lançamento de novos produtos.",
        "Criar um comitê de inovação com representantes de diferentes áreas para avaliar e priorizar ideias com base em critérios objetivos de viabilidade e impacto.",
        "Implementar um sistema de gestão de conhecimento que capture e compartilhe lições aprendidas em projetos de inovação anteriores.",
        "Desenvolver um framework de inovação personalizado que combine elementos de diferentes metodologias adaptados à cultura da sua empresa.",
        "Criar um 'mapa de inovação' visual que mostra todas as iniciativas em andamento, seus responsáveis e status atual, acessível a todos os colaboradores.",
        "Implementar um sistema de 'stage-gates' simplificado para avaliar projetos inovadores em diferentes estágios de desenvolvimento e alocar recursos adequadamente.",
        "Desenvolver um processo de 'pós-mortem positivo' para analisar tanto sucessos quanto fracassos de projetos de inovação e extrair aprendizados valiosos.",
        "Criar um 'radar de tendências' que monitora sistematicamente desenvolvimentos externos relevantes para o negócio e os distribui para as áreas apropriadas.",
        "Implementar um sistema de 'orçamento dinâmico' para projetos de inovação, com revisões trimestrais baseadas em resultados e potencial demonstrado."
      ]
    },
    {
      keywords: ["mercado", "cliente", "consumidor", "usuário", "público", "externo"],
      responses: [
        "Considere desenvolver uma plataforma de crowdsourcing externa para coletar insights diretamente dos clientes sobre melhorias em produtos e serviços.",
        "Implementar um programa de co-criação com clientes-chave para desenvolver soluções que atendam precisamente às suas necessidades não atendidas.",
        "Criar um sistema de feedback contínuo que utiliza análise de sentimento em redes sociais para identificar oportunidades de inovação.",
        "Desenvolver uma comunidade online de usuários avançados que possam testar novos produtos e fornecer feedback detalhado antes do lançamento oficial.",
        "Implementar um programa de 'cliente mistério' digital que avalia a experiência do usuário e identifica pontos de melhoria em seus canais digitais.",
        "Criar um 'conselho consultivo de clientes' que se reúne regularmente para discutir tendências, necessidades emergentes e avaliar conceitos de novos produtos.",
        "Desenvolver um programa de 'imersão em clientes' onde equipes internas passam tempo observando como os clientes realmente utilizam seus produtos no dia a dia.",
        "Implementar um sistema de 'feedback em loop fechado' que informa aos clientes como suas sugestões foram incorporadas em melhorias de produtos.",
        "Criar uma plataforma de 'previsão de mercado' onde clientes podem apostar em tendências futuras, ajudando a empresa a antecipar mudanças no mercado.",
        "Desenvolver um programa de 'embaixadores da marca' que identifica e cultiva relacionamentos com clientes influentes que podem amplificar mensagens de inovação."
      ]
    },
    {
      keywords: ["parceria", "colaboração", "ecossistema", "rede", "externo", "startup"],
      responses: [
        "Uma estratégia de inovação aberta poderia ser benéfica, estabelecendo parcerias com startups e universidades para desenvolver soluções conjuntas para problemas complexos.",
        "Criar um programa de aceleração corporativa para startups que complementem seu negócio, oferecendo recursos, mentoria e possibilidade de investimento.",
        "Estabelecer parcerias com universidades para desenvolver pesquisas aplicadas que possam ser convertidas em inovações comercializáveis.",
        "Participar de consórcios setoriais para compartilhar custos e riscos de pesquisa e desenvolvimento em tecnologias emergentes.",
        "Implementar um modelo de inovação em rede que conecta fornecedores, parceiros e até concorrentes em iniciativas pré-competitivas que beneficiam todo o setor.",
        "Criar um 'fundo de venture capital corporativo' para investir em startups promissoras que possam trazer tecnologias disruptivas para seu setor.",
        "Desenvolver um programa de 'residência corporativa' onde startups selecionadas trabalham dentro da empresa por períodos determinados para co-desenvolver soluções.",
        "Estabelecer 'desafios de inovação aberta' onde problemas específicos da empresa são compartilhados publicamente para atrair soluções externas inovadoras.",
        "Criar um 'marketplace de propriedade intelectual' onde tecnologias desenvolvidas internamente, mas não utilizadas, podem ser licenciadas para parceiros externos.",
        "Implementar um programa de 'intercâmbio de talentos' com parceiros estratégicos para compartilhar conhecimentos e perspectivas diferentes."
      ]
    },
    {
      keywords: ["sustentabilidade", "esg", "ambiental", "social", "verde", "responsabilidade"],
      responses: [
        "Desenvolver uma estratégia de inovação focada em economia circular, redesenhando produtos e processos para eliminar resíduos e poluição.",
        "Criar um programa de intraempreendedorismo social que incentiva funcionários a desenvolver soluções para desafios socioambientais relacionados ao negócio.",
        "Implementar tecnologias de rastreabilidade para garantir transparência na cadeia de suprimentos e comunicar práticas sustentáveis aos consumidores.",
        "Desenvolver produtos e serviços para a 'base da pirâmide', atendendo necessidades de populações de baixa renda de forma rentável e sustentável.",
        "Criar um laboratório de inovação verde dedicado a reduzir a pegada ambiental da empresa através de novas tecnologias e processos.",
        "Implementar um sistema de 'contabilidade de impacto' que mede e reporta o valor social e ambiental gerado por iniciativas de inovação, além do retorno financeiro.",
        "Desenvolver um programa de 'desafios de circularidade' que premia redesigns de produtos existentes para eliminar resíduos e estender ciclos de vida.",
        "Criar uma 'incubadora de negócios regenerativos' que apoia o desenvolvimento de soluções que não apenas reduzem danos, mas restauram ecossistemas.",
        "Implementar um 'painel de impacto ESG' em tempo real que mostra o progresso em metas de sustentabilidade e identifica áreas para inovação prioritária.",
        "Desenvolver um programa de 'embaixadores de sustentabilidade' em cada departamento para identificar oportunidades de inovação alinhadas com metas ESG."
      ]
    },
    {
      keywords: ["financeiro", "finanças", "custo", "investimento", "orçamento", "receita", "lucro"],
      responses: [
        "Implementar um modelo de 'orçamento baseado em valor' que aloca recursos para inovação com base no impacto potencial, não apenas no custo.",
        "Desenvolver um sistema de microfinanciamento interno para pequenas iniciativas inovadoras, com processos de aprovação simplificados e rápidos.",
        "Criar um programa de 'venture building' interno que transforma ideias promissoras em unidades de negócio semi-autônomas com métricas próprias.",
        "Implementar um modelo de 'inovação como serviço' onde equipes internas podem contratar o departamento de inovação para resolver desafios específicos.",
        "Desenvolver um sistema de 'contabilidade de inovação' que rastreia tanto investimentos quanto retornos de iniciativas inovadoras de forma transparente.",
        "Criar um 'fundo de experimentação rápida' com processos simplificados para testar hipóteses de negócio com investimentos mínimos.",
        "Implementar um modelo de 'financiamento por estágios' para projetos inovadores, com critérios claros para avançar para o próximo nível de investimento.",
        "Desenvolver parcerias de risco compartilhado com fornecedores para co-investir em inovações que beneficiam ambas as empresas.",
        "Criar um sistema de 'tokens de inovação' que permite que departamentos invistam em ideias de outros setores que consideram promissoras.",
        "Implementar um programa de 'inovação frugal' que desafia equipes a desenvolver soluções com restrições deliberadas de recursos para estimular a criatividade."
      ]
    },
    {
      keywords: ["marketing", "marca", "comunicação", "divulgação", "promoção", "mídia"],
      responses: [
        "Desenvolver uma estratégia de 'marketing de conteúdo interativo' que engaja clientes em experiências imersivas relacionadas aos seus produtos e serviços.",
        "Criar um programa de 'embaixadores digitais' que identifica e cultiva relacionamentos com influenciadores alinhados com os valores da sua marca.",
        "Implementar um sistema de 'personalização dinâmica' que adapta mensagens de marketing em tempo real com base no comportamento e preferências do cliente.",
        "Desenvolver uma plataforma de 'realidade aumentada' que permite aos clientes visualizar produtos em seus próprios ambientes antes da compra.",
        "Criar uma estratégia de 'marketing de causa' que alinha sua marca com questões sociais relevantes para seu público-alvo de forma autêntica.",
        "Implementar um programa de 'co-criação de conteúdo' onde clientes participam ativamente no desenvolvimento de campanhas de marketing.",
        "Desenvolver um sistema de 'marketing preditivo' que utiliza IA para identificar e atingir clientes potenciais antes mesmo que expressem interesse.",
        "Criar uma abordagem de 'marketing transparente' que compartilha abertamente práticas internas, processos de produção e impactos da empresa.",
        "Implementar uma estratégia de 'micro-momentos' que identifica e capitaliza oportunidades específicas na jornada do cliente para engajamento relevante.",
        "Desenvolver um programa de 'marketing sensorial' que cria experiências memoráveis envolvendo múltiplos sentidos em interações com a marca."
      ]
    },
    {
      keywords: ["educação", "aprendizado", "treinamento", "desenvolvimento", "capacitação", "conhecimento"],
      responses: [
        "Criar uma 'academia de inovação' interna que oferece treinamentos específicos em metodologias, ferramentas e mindset inovador para todos os níveis da organização.",
        "Desenvolver um programa de 'certificação em inovação' com diferentes níveis de especialização para reconhecer e desenvolver talentos internos.",
        "Implementar um sistema de 'microaprendizagem' que entrega conteúdos curtos e relevantes sobre inovação no fluxo de trabalho diário dos colaboradores.",
        "Criar uma plataforma de 'aprendizagem social' onde funcionários podem compartilhar conhecimentos, fazer perguntas e colaborar em desafios de inovação.",
        "Desenvolver um programa de 'imersão em ecossistemas' onde equipes visitam hubs de inovação, startups e centros de pesquisa para inspiração e networking.",
        "Implementar 'comunidades de prática' focadas em diferentes aspectos da inovação, como design thinking, tecnologias emergentes ou sustentabilidade.",
        "Criar um 'laboratório de experimentação' onde colaboradores podem testar novas ferramentas e metodologias em um ambiente seguro e de baixo risco.",
        "Desenvolver um programa de 'aprendizagem baseada em projetos' onde equipes multidisciplinares resolvem desafios reais da empresa como forma de desenvolvimento.",
        "Implementar um sistema de 'mentoria em inovação' que conecta colaboradores com especialistas internos e externos em áreas específicas.",
        "Criar uma 'biblioteca de recursos de inovação' curada com estudos de caso, ferramentas, templates e melhores práticas acessíveis a todos os funcionários."
      ]
    },
    {
      keywords: ["produto", "serviço", "oferta", "solução", "portfólio", "desenvolvimento"],
      responses: [
        "Implementar uma abordagem de 'desenvolvimento modular' que permite maior flexibilidade e personalização de produtos com base nas necessidades específicas dos clientes.",
        "Criar um programa de 'inovação reversa' que adapta soluções desenvolvidas em mercados emergentes para mercados maduros, geralmente com melhor custo-benefício.",
        "Desenvolver uma estratégia de 'servitização' que transforma produtos tradicionais em serviços contínuos com fluxos de receita recorrentes.",
        "Implementar um modelo de 'co-desenvolvimento' onde clientes participam ativamente no processo de criação de novos produtos desde as fases iniciais.",
        "Criar um sistema de 'prototipagem rápida' que permite testar conceitos de produtos com usuários reais antes de investimentos significativos.",
        "Desenvolver uma abordagem de 'design inclusivo' que considera as necessidades de usuários diversos, incluindo aqueles com limitações físicas ou cognitivas.",
        "Implementar um programa de 'simplificação radical' que redesenha produtos existentes para reduzir complexidade e melhorar a experiência do usuário.",
        "Criar uma estratégia de 'produtos conectados' que integra IoT e análise de dados para oferecer funcionalidades avançadas e serviços complementares.",
        "Desenvolver um sistema de 'personalização em massa' que permite customização eficiente de produtos em escala sem comprometer margens.",
        "Implementar uma abordagem de 'design sustentável' que considera todo o ciclo de vida do produto, desde a extração de materiais até o descarte ou reciclagem."
      ]
    }
  ]

  // Função para encontrar a resposta mais relevante com base nas palavras-chave e no contexto da conversa
  const findRelevantResponse = (message: string) => {
    // Converter mensagem para minúsculas para comparação
    const lowerMessage = message.toLowerCase()
    
    // Atualizar o contexto da conversa com a nova mensagem
    const updatedContext = [...conversationContext, lowerMessage]
    setConversationContext(updatedContext)
    
    // Identificar categorias relevantes com base na mensagem atual
    const relevantCategories = businessPrompts.filter(category => 
      category.keywords.some(keyword => lowerMessage.includes(keyword))
    )
    
    // Se encontramos categorias relevantes
    if (relevantCategories.length > 0) {
      // Escolher uma categoria aleatória entre as relevantes
      const selectedCategory = relevantCategories[Math.floor(Math.random() * relevantCategories.length)]
      
      // Filtrar respostas que ainda não foram usadas
      const availableResponses = selectedCategory.responses.filter(
        response => !usedResponses.has(response)
      )
      
      // Se todas as respostas já foram usadas, resetar o conjunto de respostas usadas
      if (availableResponses.length === 0) {
        setUsedResponses(new Set())
        return selectedCategory.responses[Math.floor(Math.random() * selectedCategory.responses.length)]
      }
      
      // Escolher uma resposta aleatória entre as disponíveis
      const selectedResponse = availableResponses[Math.floor(Math.random() * availableResponses.length)]
      
      // Adicionar a resposta ao conjunto de respostas usadas
      setUsedResponses(prev => new Set([...prev, selectedResponse]))
      
      return selectedResponse
    }
    
    // Verificar se há palavras-chave de contexto nas mensagens anteriores
    const contextualCategories = new Set<typeof businessPrompts[0]>()
    
    // Analisar o contexto da conversa para encontrar categorias relevantes
    updatedContext.forEach(contextMessage => {
      businessPrompts.forEach(category => {
        if (category.keywords.some(keyword => contextMessage.includes(keyword))) {
          contextualCategories.add(category)
        }
      })
    })
    
    // Se encontramos categorias contextuais
    if (contextualCategories.size > 0) {
      // Converter o Set para Array para poder selecionar aleatoriamente
      const contextualCategoriesArray = Array.from(contextualCategories)
      const selectedContextCategory = contextualCategoriesArray[Math.floor(Math.random() * contextualCategoriesArray.length)]
      
      // Filtrar respostas que ainda não foram usadas
      const availableContextResponses = selectedContextCategory.responses.filter(
        response => !usedResponses.has(response)
      )
      
      // Se todas as respostas já foram usadas, resetar o conjunto de respostas usadas
      if (availableContextResponses.length === 0) {
        setUsedResponses(new Set())
        return selectedContextCategory.responses[Math.floor(Math.random() * selectedContextCategory.responses.length)]
      }
      
      // Escolher uma resposta aleatória entre as disponíveis
      const selectedContextResponse = availableContextResponses[Math.floor(Math.random() * availableContextResponses.length)]
      
      // Adicionar a resposta ao conjunto de respostas usadas
      setUsedResponses(prev => new Set([...prev, selectedContextResponse]))
      
      return selectedContextResponse
    }
    
    // Se nenhuma categoria específica for encontrada, retornar uma resposta genérica
    const genericResponses = [
      "Que tal desenvolver um sistema de gestão de inovação que permita aos colaboradores submeter e votar em ideias? Isso pode aumentar o engajamento e descobrir talentos ocultos na empresa.",
      "Uma ideia interessante seria criar um programa de mentoria reversa, onde funcionários mais jovens orientam os mais experientes em novas tecnologias e tendências de mercado.",
      "Você poderia implementar um laboratório de inovação virtual, onde equipes multidisciplinares trabalham em projetos específicos por tempo limitado, sem afetar suas responsabilidades principais.",
      "Considere desenvolver uma plataforma de crowdsourcing interna para resolver desafios específicos da empresa, oferecendo recompensas para as melhores soluções.",
      "Uma estratégia de inovação aberta poderia ser benéfica, estabelecendo parcerias com startups e universidades para desenvolver soluções conjuntas para problemas complexos.",
      "Já pensou em criar um programa de reconhecimento de inovação que celebra não apenas sucessos, mas também fracassos que geraram aprendizados valiosos?",
      "Uma abordagem interessante seria implementar 'dias de inovação' mensais, onde toda a empresa para suas atividades regulares para focar em projetos inovadores.",
      "Considere estabelecer parcerias com universidades locais para criar programas de estágio focados em projetos de inovação específicos.",
      "Que tal implementar um sistema de 'desafios de inovação' onde problemas reais da empresa são apresentados para que qualquer funcionário possa propor soluções?",
      "Uma estratégia eficaz seria criar um 'conselho de inovação' com representantes de diferentes níveis hierárquicos, não apenas lideranças."
    ]
    
    // Filtrar respostas genéricas que ainda não foram usadas
    const availableGenericResponses = genericResponses.filter(
      response => !usedResponses.has(response)
    )
    
    // Se todas as respostas já foram usadas, resetar o conjunto de respostas usadas
    if (availableGenericResponses.length === 0) {
      setUsedResponses(new Set())
      return genericResponses[Math.floor(Math.random() * genericResponses.length)]
    }
    
    // Escolher uma resposta aleatória entre as disponíveis
    const selectedGenericResponse = availableGenericResponses[Math.floor(Math.random() * availableGenericResponses.length)]
    
    // Adicionar a resposta ao conjunto de respostas usadas
    setUsedResponses(prev => new Set([...prev, selectedGenericResponse]))
    
    return selectedGenericResponse
  }

  // Função para enviar mensagem
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    // Adiciona a mensagem do usuário
    const userMessage: Message = {
      id: generateId(),
      content: inputValue,
      type: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      // Simula uma chamada de API para uma API gratuita de IA
      // Em um ambiente de produção, você usaria uma API real como OpenAI, Hugging Face, etc.
      setTimeout(() => {
        // Encontra uma resposta relevante com base no conteúdo da mensagem do usuário
        const relevantResponse = findRelevantResponse(userMessage.content)

        const aiMessage: Message = {
          id: generateId(),
          content: relevantResponse,
          type: "ai",
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, aiMessage])
        setIsLoading(false)
      }, 1500)
    } catch (error) {
      console.error("Erro ao processar a mensagem:", error)
      
      // Mensagem de erro amigável
      const errorMessage: Message = {
        id: generateId(),
        content: "Desculpe, tive um problema ao processar sua mensagem. Por favor, tente novamente.",
        type: "ai",
        timestamp: new Date(),
      }
      
      setMessages((prev) => [...prev, errorMessage])
      setIsLoading(false)
    }
  }

  // Função para lidar com a tecla Enter
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <Card className="w-full h-[600px] flex flex-col">
      <CardContent className="flex flex-col h-full p-4">
        {/* Área de mensagens */}
        <div className="flex-1 overflow-y-auto mb-4 pr-2">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="bg-gray-100 text-gray-800 rounded-lg p-3 max-w-[80%]">
                <div className="flex items-center space-x-2">
                  <Bot className="h-5 w-5" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Área de input */}
        <div className="flex items-center space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Digite sua mensagem..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            disabled={isLoading || !inputValue.trim()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}