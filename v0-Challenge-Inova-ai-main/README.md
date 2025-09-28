# Documentação Técnica - INOVA.AI

## 1. Visão Geral do Projeto

O INOVA.AI é uma plataforma de inovação corporativa da Eurofarma, desenvolvida com tecnologias modernas para facilitar a submissão, avaliação e acompanhamento de ideias inovadoras dentro da organização. A aplicação utiliza uma arquitetura baseada em Next.js com TypeScript, oferecendo uma experiência de usuário rica e responsiva.

### 1.1 Objetivos do Sistema

- **Centralização de Ideias**: Criar um repositório central para todas as ideias de inovação da empresa
- **Avaliação Estruturada**: Implementar um processo sistemático de avaliação de ideias
- **Transparência**: Fornecer visibilidade sobre o status e progresso das ideias
- **Colaboração**: Facilitar a colaboração entre diferentes departamentos
- **Gamificação**: Incentivar a participação através de elementos de gamificação (leaderboard, badges)
- **Assistência por IA**: Oferecer sugestões e melhorias de ideias através de inteligência artificial

### 1.2 Público-Alvo

- **Colaboradores Internos**: Funcionários de todos os níveis hierárquicos da Eurofarma
- **Gestores de Inovação**: Responsáveis pela avaliação e implementação de ideias
- **Executivos**: Para acompanhamento de métricas e resultados do programa de inovação
- **Parceiros Externos**: Potenciais colaboradores externos (com acesso limitado)

## 2. Arquitetura do Sistema

### 2.1 Tecnologias Principais

- **Framework Frontend**: Next.js 14.2.33 (App Router)
- **Linguagem de Programação**: TypeScript 5.x
- **Biblioteca de UI**: React 18.x
- **Estilização**: TailwindCSS 4.1.9 com PostCSS 8.5.x
- **Componentes de UI**: Radix UI (diversos componentes primitivos)
- **Gerenciamento de Formulários**: React Hook Form 7.60.0
- **Validação**: Zod 3.25.67
- **Temas**: next-themes (última versão)
- **Fontes**: Inter (sans-serif) e Roboto Mono (monospace) via Google Fonts
- **Ícones**: Lucide React 0.454.0
- **Gráficos e Visualizações**: Recharts (última versão)
- **Notificações**: Sonner 1.7.4
- **Carrossel**: Embla Carousel React 8.5.1
- **Calendário**: React Day Picker 9.8.0
- **Utilitários de Data**: date-fns 4.1.0
- **Animações**: tailwindcss-animate 1.0.7

### 2.2 Padrões Arquiteturais

- **App Router do Next.js**: Estrutura baseada em pastas para definição de rotas
- **Server Components**: Utilização de componentes renderizados no servidor para melhor performance
- **Client Components**: Componentes interativos renderizados no cliente
- **Context API**: Para gerenciamento de estado global
- **Componentes Compostos**: Padrão de design para componentes complexos
- **Atomic Design**: Organização de componentes em átomos, moléculas, organismos, templates e páginas

### 2.3 Estrutura de Diretórios Detalhada

```
├── app/                      # Diretório principal da aplicação Next.js (App Router)
│   ├── (protected)/          # Grupo de rotas protegidas que requerem autenticação
│   │   ├── ai-suggestions/   # Funcionalidade de sugestões de IA
│   │   │   ├── components/   # Componentes específicos para sugestões de IA
│   │   │   └── page.tsx      # Página principal de sugestões de IA
│   │   ├── analytics/        # Análises e métricas
│   │   │   ├── components/   # Componentes de visualização de dados
│   │   │   └── page.tsx      # Página principal de analytics
│   │   ├── dashboard/        # Painel principal
│   │   │   ├── components/   # Componentes específicos do dashboard
│   │   │   └── page.tsx      # Página principal do dashboard
│   │   ├── idea-details/     # Detalhes de ideias específicas
│   │   │   ├── [id]/         # Rota dinâmica para detalhes de uma ideia específica
│   │   │   │   └── page.tsx  # Página de detalhes da ideia
│   │   │   └── components/   # Componentes para visualização de detalhes
│   │   ├── layout.tsx        # Layout compartilhado para rotas protegidas
│   │   ├── leaderboard/      # Ranking de inovadores
│   │   │   ├── components/   # Componentes específicos do leaderboard
│   │   │   └── page.tsx      # Página principal do leaderboard
│   │   ├── my-ideas/         # Ideias do usuário atual
│   │   │   ├── components/   # Componentes específicos para gerenciamento de ideias
│   │   │   └── page.tsx      # Página principal de ideias do usuário
│   │   └── submit-idea/      # Submissão de novas ideias
│   │       ├── components/   # Componentes de formulário para submissão
│   │       └── page.tsx      # Página de submissão de ideias
│   ├── login/                # Página de login
│   │   └── page.tsx          # Implementação da página de login
│   ├── globals.css           # Estilos globais da aplicação
│   ├── layout.tsx            # Layout principal da aplicação (root layout)
│   └── page.tsx              # Página inicial (landing page)
├── components/               # Componentes reutilizáveis
│   ├── ai-chat/              # Componentes de chat com IA
│   │   ├── chat-bubble.tsx   # Componente para mensagens de chat
│   │   ├── chat-input.tsx    # Componente para entrada de texto
│   │   └── chat-component.tsx # Componente principal do chat
│   ├── auth/                 # Componentes de autenticação
│   │   ├── login-form.tsx    # Formulário de login
│   │   └── protected-route.tsx # Componente para proteção de rotas
│   ├── layout/               # Componentes de layout
│   │   ├── header.tsx        # Cabeçalho da aplicação
│   │   ├── footer.tsx        # Rodapé da aplicação
│   │   └── sidebar.tsx       # Barra lateral de navegação
│   ├── theme-provider.tsx    # Provedor de tema (claro/escuro)
│   └── ui/                   # Componentes de UI básicos
│       ├── avatar.tsx        # Componente de avatar de usuário
│       ├── badge.tsx         # Componente de badge/etiqueta
│       ├── button.tsx        # Componente de botão customizado
│       ├── card.tsx          # Componente de card para exibição de informações
│       ├── checkbox.tsx      # Componente de checkbox
│       ├── dialog.tsx        # Componente de diálogo/modal
│       ├── dropdown.tsx      # Componente de menu dropdown
│       ├── input.tsx         # Componente de input de texto
│       ├── label.tsx         # Componente de label para formulários
│       ├── progress.tsx      # Componente de barra de progresso
│       ├── select.tsx        # Componente de seleção dropdown
│       ├── separator.tsx     # Componente de separador visual
│       ├── skeleton.tsx      # Componente de carregamento (skeleton)
│       ├── tabs.tsx          # Componente de abas
│       ├── textarea.tsx      # Componente de área de texto
│       ├── toast.tsx         # Componente de notificação toast
│       └── tooltip.tsx       # Componente de tooltip
├── contexts/                 # Contextos React para gerenciamento de estado
│   ├── auth-context.tsx      # Contexto de autenticação
│   │   ├── types.ts          # Tipos para o contexto de autenticação
│   │   ├── actions.ts        # Ações do contexto de autenticação
│   │   └── reducer.ts        # Reducer para gerenciamento de estado
│   └── ideas-context.tsx     # Contexto de gerenciamento de ideias
│       ├── types.ts          # Tipos para o contexto de ideias
│       ├── actions.ts        # Ações do contexto de ideias
│       └── reducer.ts        # Reducer para gerenciamento de estado
├── hooks/                    # Hooks personalizados
│   ├── use-auth.ts           # Hook para acesso ao contexto de autenticação
│   ├── use-ideas.ts          # Hook para acesso ao contexto de ideias
│   ├── use-media-query.ts    # Hook para detecção de media queries
│   ├── use-local-storage.ts  # Hook para interação com localStorage
│   └── use-debounce.ts       # Hook para debounce de funções
├── lib/                      # Utilitários e funções auxiliares
│   ├── auth.ts               # Funções de autenticação
│   ├── api.ts                # Funções para chamadas de API
│   ├── validation.ts         # Esquemas de validação Zod
│   └── utils.ts              # Utilitários gerais
├── types/                    # Definições de tipos globais
│   ├── auth.ts               # Tipos relacionados à autenticação
│   ├── idea.ts               # Tipos relacionados às ideias
│   ├── user.ts               # Tipos relacionados aos usuários
│   └── api.ts                # Tipos relacionados às APIs
├── public/                   # Arquivos estáticos
│   ├── fonts/                # Fontes locais (fallback)
│   ├── images/               # Imagens estáticas
│   │   ├── logos/            # Logos da empresa
│   │   ├── icons/            # Ícones personalizados
│   │   └── placeholders/     # Imagens de placeholder
│   └── locales/              # Arquivos de tradução (i18n)
└── styles/                   # Estilos adicionais
    ├── globals.css           # Estilos globais adicionais
    ├── animations.css        # Definições de animações
    └── themes/               # Definições de temas
        ├── light.css         # Tema claro
        └── dark.css          # Tema escuro
```

## 3. Componentes Principais

### 3.1 Sistema de Autenticação

O sistema de autenticação é gerenciado através do `AuthProvider` no arquivo `contexts/auth-context.tsx`. Este provedor encapsula toda a aplicação e fornece informações sobre o estado de autenticação do usuário para os componentes filhos.

#### 3.1.1 Estrutura do AuthContext

```typescript
// Estrutura simplificada do AuthContext
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
  department: string;
  avatar?: string;
  createdAt: Date;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}
```

#### 3.1.2 Fluxo de Autenticação

1. **Login**: O usuário submete credenciais através do formulário de login
2. **Validação**: As credenciais são validadas contra o backend
3. **Armazenamento**: Em caso de sucesso, os dados do usuário e token são armazenados
4. **Redirecionamento**: O usuário é redirecionado para o dashboard
5. **Verificação de Sessão**: Em cada carregamento de página, a sessão é verificada
6. **Logout**: Ao fazer logout, os dados são limpos e o usuário é redirecionado

#### 3.1.3 Proteção de Rotas

As rotas protegidas são implementadas através do componente `ProtectedRoute` em `components/auth/protected-route.tsx`, que verifica se o usuário está autenticado antes de renderizar o conteúdo protegido.

```typescript
// Implementação simplificada do ProtectedRoute
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return isAuthenticated ? <>{children}</> : null;
};
```

### 3.2 Layout e Navegação

#### 3.2.1 Sidebar

A navegação principal é implementada através do componente `Sidebar` em `components/layout/sidebar.tsx`. Este componente fornece acesso às diferentes seções da aplicação e adapta-se ao estado de autenticação do usuário.

Características principais:
- **Responsividade**: Adapta-se a diferentes tamanhos de tela
- **Colapso**: Pode ser expandido ou recolhido
- **Navegação Contextual**: Exibe opções diferentes baseadas no perfil do usuário
- **Indicador de Seção Atual**: Destaca visualmente a seção atual
- **Atalhos**: Fornece atalhos para ações frequentes

#### 3.2.2 Layout Principal

O layout principal da aplicação é definido em `app/layout.tsx`, que configura as fontes (Inter e Roboto Mono), metadados e estrutura básica do HTML.

```typescript
// Estrutura simplificada do layout principal
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${robotoMono.variable} antialiased`}>
      <body className="bg-background text-foreground">
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ToastProvider>
              {children}
            </ToastProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
```

#### 3.2.3 Layout de Área Protegida

O layout específico para áreas protegidas (`app/(protected)/layout.tsx`) inclui a barra lateral e estrutura comum a todas as páginas autenticadas:

```typescript
// Estrutura simplificada do layout de área protegida
export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute>
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 overflow-auto p-6">
          <Header />
          <div className="mt-6">
            {children}
          </div>
          <Footer />
        </main>
      </div>
    </ProtectedRoute>
  )
}
```

### 3.3 Componentes de UI

A aplicação utiliza uma extensa biblioteca de componentes do Radix UI, que são estilizados com TailwindCSS. Estes componentes são altamente acessíveis e personalizáveis.

#### 3.3.1 Botões

O componente `Button` (`components/ui/button.tsx`) é um exemplo de componente de UI básico que utiliza `class-variance-authority` para gerenciar variantes:

```typescript
// Implementação simplificada do componente Button
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-primary",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
```

#### 3.3.2 Cards

O componente `Card` (`components/ui/card.tsx`) é utilizado para exibir informações em blocos visuais distintos:

```typescript
// Implementação simplificada do componente Card
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

// Outros componentes: CardTitle, CardDescription, CardContent, CardFooter
```

#### 3.3.3 Formulários

Os componentes de formulário incluem:

- **Input**: Campo de texto básico
- **Textarea**: Campo de texto multilinha
- **Checkbox**: Caixa de seleção
- **Select**: Menu de seleção dropdown
- **RadioGroup**: Grupo de opções de rádio
- **Switch**: Alternador on/off
- **Slider**: Controle deslizante
- **DatePicker**: Seletor de data

Todos estes componentes são integrados com React Hook Form para gerenciamento de estado e validação.

#### 3.3.4 Feedback Visual

Componentes para feedback ao usuário:

- **Toast**: Notificações temporárias
- **Dialog**: Modais para confirmações e ações importantes
- **Progress**: Barras de progresso
- **Skeleton**: Placeholders durante carregamento
- **Alert**: Mensagens de alerta

### 3.4 Gerenciamento de Estado

#### 3.4.1 AuthContext

O contexto de autenticação gerencia:

- Estado do usuário atual
- Status de autenticação
- Funções de login/logout
- Atualização de perfil
- Recuperação de senha

Implementação baseada em useReducer para gerenciamento de estado complexo.

#### 3.4.2 IdeasContext

O contexto de ideias gerencia:

- Lista de ideias
- Filtros e ordenação
- Paginação
- Funções CRUD para ideias
- Status de carregamento
- Cache de dados

```typescript
// Estrutura simplificada do IdeasContext
interface Idea {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected';
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  votes: number;
  comments: Comment[];
  attachments: Attachment[];
  tags: string[];
}

interface IdeasState {
  ideas: Idea[];
  filteredIdeas: Idea[];
  filters: {
    category: string | null;
    status: string | null;
    search: string;
    dateRange: [Date | null, Date | null];
  };
  sorting: {
    field: keyof Idea;
    direction: 'asc' | 'desc';
  };
  pagination: {
    page: number;
    perPage: number;
    total: number;
  };
  isLoading: boolean;
  error: string | null;
}

interface IdeasContextType extends IdeasState {
  fetchIdeas: () => Promise<void>;
  fetchIdeaById: (id: string) => Promise<Idea | null>;
  createIdea: (idea: Omit<Idea, 'id'>) => Promise<Idea>;
  updateIdea: (id: string, data: Partial<Idea>) => Promise<Idea>;
  deleteIdea: (id: string) => Promise<void>;
  voteIdea: (id: string) => Promise<void>;
  addComment: (ideaId: string, comment: string) => Promise<void>;
  setFilters: (filters: Partial<IdeasState['filters']>) => void;
  setSorting: (sorting: IdeasState['sorting']) => void;
  setPage: (page: number) => void;
}
```

#### 3.4.3 Hooks Personalizados

Hooks para facilitar o acesso ao estado:

- **useAuth**: Acesso ao contexto de autenticação
- **useIdeas**: Acesso ao contexto de ideias
- **useMediaQuery**: Detecção de media queries para responsividade
- **useLocalStorage**: Persistência de dados no localStorage
- **useDebounce**: Otimização de operações frequentes

## 4. Funcionalidades Principais

### 4.1 Submissão de Ideias

A funcionalidade de submissão de ideias é implementada na rota `/submit-idea`. Utiliza React Hook Form para gerenciamento de formulários e Zod para validação de dados.

#### 4.1.1 Formulário de Submissão

O formulário de submissão inclui os seguintes campos:

- **Título**: Nome da ideia (obrigatório)
- **Descrição**: Detalhamento da ideia (obrigatório)
- **Categoria**: Seleção da categoria da ideia (obrigatório)
- **Tags**: Palavras-chave relacionadas à ideia
- **Impacto Esperado**: Descrição do impacto esperado
- **Recursos Necessários**: Estimativa de recursos para implementação
- **Anexos**: Upload de arquivos relacionados
- **Colaboradores**: Outros usuários envolvidos na ideia

#### 4.1.2 Validação com Zod

```typescript
// Esquema de validação para submissão de ideias
const ideaSchema = z.object({
  title: z.string().min(5, "O título deve ter pelo menos 5 caracteres").max(100),
  description: z.string().min(20, "A descrição deve ter pelo menos 20 caracteres"),
  category: z.string().min(1, "Selecione uma categoria"),
  tags: z.array(z.string()).optional(),
  expectedImpact: z.string().optional(),
  requiredResources: z.string().optional(),
  attachments: z.array(
    z.object({
      name: z.string(),
      url: z.string(),
      type: z.string(),
      size: z.number(),
    })
  ).optional(),
  collaborators: z.array(z.string()).optional(),
});
```

#### 4.1.3 Fluxo de Submissão

1. Usuário preenche o formulário
2. Validação em tempo real dos campos
3. Pré-visualização da ideia antes do envio
4. Submissão para o backend
5. Feedback visual de sucesso/erro
6. Redirecionamento para a página de detalhes da ideia

### 4.2 Dashboard

O dashboard (`/dashboard`) apresenta uma visão geral das ideias, métricas e atividades recentes.

#### 4.2.1 Componentes do Dashboard

- **Resumo de Métricas**: Cards com números-chave (total de ideias, aprovadas, etc.)
- **Gráfico de Ideias por Status**: Visualização da distribuição de ideias
- **Gráfico de Tendências**: Evolução temporal das submissões
- **Ideias Recentes**: Lista das últimas ideias submetidas
- **Atividades Recentes**: Feed de atividades no sistema
- **Ranking Resumido**: Mini-leaderboard com os principais inovadores

#### 4.2.2 Personalização

O dashboard é personalizável de acordo com o perfil do usuário:
- **Administradores**: Visão global de todas as métricas
- **Gestores**: Foco nas ideias de sua área/departamento
- **Usuários**: Foco em suas próprias ideias e atividades

### 4.3 Análise de Ideias

A seção de análise (`/analytics`) fornece métricas detalhadas sobre as ideias submetidas, aprovadas, rejeitadas, etc.

#### 4.3.1 Visualizações Disponíveis

- **Distribuição por Categoria**: Gráfico de pizza/barras
- **Evolução Temporal**: Gráfico de linha/área
- **Mapa de Calor**: Atividade por dia/hora
- **Funil de Conversão**: Taxa de aprovação por etapa
- **Análise de Sentimento**: Baseada em comentários (se aplicável)
- **Correlações**: Relações entre categorias e taxas de aprovação

#### 4.3.2 Filtros e Segmentação

- **Período**: Seleção de intervalo de datas
- **Departamento**: Filtro por departamento
- **Categoria**: Filtro por categoria de ideia
- **Status**: Filtro por status da ideia
- **Usuário**: Filtro por criador da ideia

#### 4.3.3 Exportação de Dados

- **CSV**: Exportação em formato tabular
- **PDF**: Relatórios formatados
- **Imagens**: Exportação de gráficos individuais

### 4.4 Assistente de IA

O componente de chat com IA (`components/ai-chat/chat-component.tsx`) permite aos usuários interagir com um assistente virtual.

#### 4.4.1 Funcionalidades do Assistente

- **Sugestões de Ideias**: Geração de ideias baseadas em tópicos
- **Refinamento**: Sugestões para melhorar ideias existentes
- **Categorização**: Sugestão de categorias para ideias
- **Pesquisa**: Busca por ideias similares no sistema
- **FAQ**: Respostas para perguntas frequentes sobre o processo

#### 4.4.2 Interface do Chat

- **Histórico de Mensagens**: Persistência da conversa
- **Indicador de Digitação**: Feedback visual durante processamento
- **Sugestões Rápidas**: Botões para perguntas comuns
- **Anexos**: Suporte para compartilhamento de arquivos
- **Formatação**: Suporte para markdown nas respostas

#### 4.4.3 Integração com o Fluxo de Trabalho

- **Criação Direta**: Transformar sugestões em rascunhos de ideias
- **Compartilhamento**: Enviar trechos da conversa para colaboradores
- **Exportação**: Salvar conversas para referência futura

### 4.5 Leaderboard

O leaderboard (`/leaderboard`) apresenta um ranking dos usuários mais ativos e com mais ideias aprovadas.

#### 4.5.1 Métricas de Classificação

- **Pontuação Total**: Soma ponderada de todas as atividades
- **Ideias Submetidas**: Número total de ideias enviadas
- **Ideias Aprovadas**: Número de ideias que foram aprovadas
- **Taxa de Aprovação**: Percentual de ideias aprovadas
- **Colaborações**: Participação em ideias de outros usuários
- **Engajamento**: Comentários, votos e outras interações

#### 4.5.2 Visualização

- **Ranking Global**: Classificação geral de todos os usuários
- **Ranking por Departamento**: Classificação dentro de cada departamento
- **Ranking Temporal**: Classificação por período (mensal, trimestral, anual)
- **Badges e Conquistas**: Reconhecimentos visuais por marcos atingidos

#### 4.5.3 Gamificação

- **Níveis de Inovador**: Progressão baseada em pontos acumulados
- **Badges**: Conquistas por ações específicas
- **Desafios**: Metas temporárias com recompensas
- **Notificações**: Alertas sobre mudanças de posição no ranking

## 5. Estilização e Temas

### 5.1 Sistema de Design

A aplicação utiliza TailwindCSS para estilização, seguindo um sistema de design consistente:

#### 5.1.1 Tokens de Design

```css
/* Exemplo simplificado de tokens de design */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  
  --popover: 0 0% 100%;
  --popover-foreground: 222.2 84% 4.9%;
  
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  
  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;
  
  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;
  
  --accent: 210 40% 96.1%;
  --accent-foreground: 222.2 47.4% 11.2%;
  
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 221.2 83.2% 53.3%;
  
  --radius: 0.5rem;
}
```

#### 5.1.2 Temas Claro e Escuro

A aplicação suporta temas claro e escuro através da biblioteca next-themes:

```css
/* Tema escuro */
.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  
  --card: 222.2 84% 4.9%;
  --card-foreground: 210 40% 98%;
  
  --popover: 222.2 84% 4.9%;
  --popover-foreground: 210 40% 98%;
  
  --primary: 217.2 91.2% 59.8%;
  --primary-foreground: 222.2 47.4% 11.2%;
  
  --secondary: 217.2 32.6% 17.5%;
  --secondary-foreground: 210 40% 98%;
  
  --muted: 217.2 32.6% 17.5%;
  --muted-foreground: 215 20.2% 65.1%;
  
  --accent: 217.2 32.6% 17.5%;
  --accent-foreground: 210 40% 98%;
  
  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 210 40% 98%;
  
  --border: 217.2 32.6% 17.5%;
  --input: 217.2 32.6% 17.5%;
  --ring: 224.3 76.3% 48%;
}
```

### 5.2 Tipografia

As fontes utilizadas são:
- **Inter**: Para texto geral (sans-serif)
- **Roboto Mono**: Para código e dados técnicos (monospace)

```typescript
// Configuração das fontes
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-sans",
})

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
})
```

### 5.3 Responsividade

A aplicação é totalmente responsiva, adaptando-se a diferentes tamanhos de tela:

- **Mobile First**: Design pensado primeiramente para dispositivos móveis
- **Breakpoints**: Pontos de quebra para diferentes tamanhos de tela
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
  - 2xl: 1536px
- **Layout Fluido**: Uso de unidades relativas (rem, %, vh/vw)
- **Grid e Flexbox**: Para layouts complexos e alinhamentos

### 5.4 Animações

Animações sutis são utilizadas para melhorar a experiência do usuário:

- **Transições**: Para mudanças de estado (hover, focus, etc.)
- **Micro-interações**: Feedback visual para ações do usuário
- **Skeleton Loading**: Durante carregamento de dados
- **Page Transitions**: Transições entre páginas

## 6. Dependências Principais

### 6.1 Dependências de Produção

- **@hookform/resolvers (^3.10.0)**: Integrações para React Hook Form, incluindo validação com Zod
- **@radix-ui/react-*** (diversas versões): Componentes de UI acessíveis e primitivos
  - accordion (1.2.2): Painéis expansíveis
  - alert-dialog (1.1.4): Diálogos de alerta
  - avatar (latest): Componente de avatar
  - checkbox (1.1.3): Caixas de seleção
  - dialog (1.1.4): Modais e diálogos
  - dropdown-menu (2.1.4): Menus dropdown
  - label (latest): Rótulos para formulários
  - progress (latest): Barras de progresso
  - select (latest): Menus de seleção
  - tabs (1.1.2): Sistema de abas
  - toast (1.2.4): Notificações toast
- **@vercel/analytics (1.3.1)**: Análise de uso da aplicação
- **class-variance-authority (^0.7.1)**: Utilitário para gerenciamento de classes condicionais
- **clsx (^2.1.1)**: Utilitário para construção de nomes de classes
- **date-fns (4.1.0)**: Manipulação de datas
- **embla-carousel-react (8.5.1)**: Componente de carrossel
- **lucide-react (^0.454.0)**: Biblioteca de ícones
- **next (^14.2.33)**: Framework React
- **next-themes (latest)**: Suporte a temas claro/escuro
- **react (^18)**: Biblioteca principal
- **react-hook-form (^7.60.0)**: Gerenciamento de formulários
- **recharts (latest)**: Visualização de dados
- **sonner (^1.7.4)**: Sistema de notificações toast
- **zod (3.25.67)**: Validação de esquemas

### 6.2 Dependências de Desenvolvimento

- **@tailwindcss/postcss (^4.1.9)**: Integração PostCSS para TailwindCSS
- **@types/node (^22)**: Definições de tipos para Node.js
- **@types/react (^18)**: Definições de tipos para React
- **@types/react-dom (^18)**: Definições de tipos para ReactDOM
- **postcss (^8.5)**: Processador CSS
- **tailwindcss (^4.1.9)**: Framework CSS utilitário
- **tw-animate-css (1.3.3)**: Animações para TailwindCSS
- **typescript (^5)**: Suporte a TypeScript

## 7. Configuração do Projeto

### 7.1 Scripts NPM

- **build**: Compila a aplicação para produção (`next build`)
- **dev**: Inicia o servidor de desenvolvimento (`next dev`)
- **lint**: Executa verificação de código (`next lint`)
- **start**: Inicia a aplicação compilada (`next start`)

### 7.2 Configuração do Next.js

O arquivo `next.config.mjs` contém configurações específicas do Next.js:

```javascript
// Configuração simplificada do Next.js
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', 'example.com'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ['@prisma/client'],
  },
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};
```

### 7.3 Configuração do TypeScript

O arquivo `tsconfig.json` contém configurações específicas do TypeScript:

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 7.4 Configuração do TailwindCSS

O arquivo `tailwind.config.js` contém configurações específicas do TailwindCSS:

```javascript
// Configuração simplificada do TailwindCSS
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

## 8. Considerações de Segurança

### 8.1 Autenticação e Autorização

- **Autenticação**: Implementada através de contexto React
- **Tokens JWT**: Armazenados de forma segura
- **Refresh Tokens**: Para manter sessões ativas
- **Expiração de Sessão**: Timeout para inatividade
- **Níveis de Acesso**: Diferentes permissões por perfil de usuário
- **Proteção de Rotas**: Verificação de autenticação em rotas protegidas

### 8.2 Validação de Dados

- **Validação no Cliente**: Com Zod para feedback imediato
- **Validação no Servidor**: Dupla verificação para segurança
- **Sanitização**: Limpeza de dados de entrada para prevenir XSS
- **Rate Limiting**: Limitação de requisições para prevenir abusos

### 8.3 Proteção contra Ataques Comuns

- **XSS (Cross-Site Scripting)**: Sanitização de inputs e uso de CSP
- **CSRF (Cross-Site Request Forgery)**: Tokens anti-CSRF
- **Clickjacking**: Headers X-Frame-Options
- **Injection**: Parametrização de queries e validação
- **Sensitive Data Exposure**: Minimização de dados sensíveis no cliente

### 8.4 Boas Práticas

- **HTTPS**: Uso exclusivo de conexões seguras
- **Content Security Policy**: Restrição de fontes de conteúdo
- **Secure Cookies**: Flags HttpOnly e Secure
- **Logging**: Registro de eventos de segurança
- **Atualizações**: Manutenção regular de dependências

## 9. Considerações de Performance

### 9.1 Otimizações do Next.js

- **Server Components**: Renderização no servidor para melhor performance
- **Streaming**: Carregamento progressivo de conteúdo
- **Image Optimization**: Otimização automática de imagens
- **Font Optimization**: Carregamento otimizado de fontes
- **Script Optimization**: Carregamento eficiente de scripts

### 9.2 Otimizações de Renderização

- **Memoização**: Uso de React.memo, useMemo e useCallback
- **Code Splitting**: Divisão de código por rota
- **Lazy Loading**: Carregamento sob demanda de componentes pesados
- **Virtualização**: Para listas longas (react-window ou similar)
- **Skeleton Loading**: Feedback visual durante carregamento

### 9.3 Otimizações de Rede

- **Caching**: Estratégias de cache para dados frequentes
- **Prefetching**: Pré-carregamento de rotas prováveis
- **Compression**: Compressão de assets e respostas
- **Bundle Size**: Monitoramento e otimização do tamanho do bundle
- **API Batching**: Agrupamento de requisições quando possível

### 9.4 Monitoramento

- **Web Vitals**: Monitoramento de métricas de performance
- **Error Tracking**: Captura e análise de erros
- **Analytics**: Análise de uso e comportamento
- **Lighthouse**: Avaliações regulares de performance
- **User Timing**: Medições personalizadas de performance

## 10. Integração com Serviços Externos

### 10.1 Análise e Monitoramento

- **Vercel Analytics**: Análise de uso e performance
- **Error Tracking**: Captura e análise de erros em produção
- **Logging**: Registro de eventos e atividades

### 10.2 Armazenamento

- **Armazenamento de Arquivos**: Para anexos e imagens
- **CDN**: Distribuição de conteúdo estático

### 10.3 Notificações

- **Email**: Notificações por email
- **Push Notifications**: Notificações em tempo real
- **Webhooks**: Integração com sistemas externos

## 11. Estratégia de Implantação

### 11.1 Ambientes

- **Desenvolvimento**: Para trabalho local
- **Staging**: Para testes pré-produção
- **Produção**: Ambiente final para usuários

### 11.2 CI/CD

- **Integração Contínua**: Testes automáticos a cada commit
- **Entrega Contínua**: Implantação automática após aprovação
- **Rollbacks**: Mecanismo para reverter implantações problemáticas

### 11.3 Monitoramento Pós-Implantação

- **Alertas**: Notificações sobre problemas
- **Dashboards**: Visualização de métricas em tempo real
- **Logs**: Análise de logs para diagnóstico

## 12. Conclusão

O INOVA.AI é uma aplicação moderna e robusta, construída com tecnologias de ponta para fornecer uma experiência de usuário excepcional. A arquitetura baseada em Next.js, combinada com TypeScript e componentes React, oferece uma base sólida para o desenvolvimento contínuo e a adição de novas funcionalidades.

A plataforma facilita o processo de inovação corporativa da Eurofarma, permitindo que colaboradores submetam, acompanhem e colaborem em ideias inovadoras, impulsionando a cultura de inovação na organização.

### 12.1 Pontos Fortes

- **Arquitetura Moderna**: Baseada em Next.js App Router
- **Experiência de Usuário**: Interface intuitiva e responsiva
- **Acessibilidade**: Componentes acessíveis do Radix UI
- **Performance**: Otimizações de renderização e carregamento
- **Segurança**: Implementação de boas práticas de segurança
- **Escalabilidade**: Estrutura modular para crescimento futuro

### 12.2 Próximos Passos

- **Testes Automatizados**: Implementação de testes unitários e de integração
- **Internacionalização**: Suporte a múltiplos idiomas
- **PWA**: Transformação em Progressive Web App
- **Integração com IA**: Expansão das capacidades do assistente virtual
- **Análise Avançada**: Implementação de insights baseados em dados
- **Gamificação**: Expansão dos elementos de gamificação
