

# INOVA.AI - Portal de Inovação Eurofarma

## Visão Geral

O INOVA.AI é uma plataforma de inovação corporativa desenvolvida para a Eurofarma, focada em estimular, gerenciar e implementar ideias inovadoras dos colaboradores em diversas áreas de negócio, como Saúde, Sustentabilidade, Tecnologia, Processos, Produtos, RH e Marketing. Utiliza inteligência artificial para sugerir, analisar e acompanhar ideias, promovendo engajamento e impacto positivo na empresa.

### Principais Características
- Envio, acompanhamento e avaliação de ideias inovadoras por área de negócio
- Sugestões automáticas de IA para desafios corporativos
- Painéis de analytics com KPIs, aprovações e implementações
- Detalhamento de ideias, cronogramas e feedbacks
- Incubadora de projetos, desafios de circularidade e iniciativas ESG
- Autenticação e rotas protegidas
- Interface responsiva e moderna
- Temas claro/escuro customizados

---

## Arquitetura do Projeto

O projeto é composto por um frontend em Next.js (React + TypeScript), com autenticação simulada, gerenciamento de contexto, componentes reutilizáveis e integração com IA para sugestões de inovação. Não há backend dedicado, mas a estrutura permite fácil integração futura.

### Diagrama de Pastas

```
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── login/
│   │   └── page.tsx
│   └── (protected)/
│       ├── layout.tsx
│       ├── dashboard/
│       │   └── page.tsx
│       ├── analytics/
│       │   └── page.tsx
│       ├── ai-suggestions/
│       │   └── page.tsx
│       ├── idea-details/
│       │   └── [id]/page.tsx
│       ├── leaderboard/
│       │   └── page.tsx
│       ├── my-ideas/
│       │   ├── loading.tsx
│       │   └── page.tsx
│       └── submit-idea/
│           └── page.tsx
├── components/
│   ├── theme-provider.tsx
│   ├── ai-chat/
│   │   └── chat-component.tsx
│   ├── auth/
│   │   └── protected-route.tsx
│   ├── layout/
│   │   └── sidebar.tsx
│   └── ui/
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── checkbox.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── progress.tsx
│       ├── select.tsx
│       └── textarea.tsx
├── contexts/
│   ├── auth-context.tsx
│   └── ideas-context.tsx
├── lib/
│   ├── auth.ts
│   └── utils.ts
├── public/
│   ├── placeholder-logo.png/svg
│   ├── placeholder-user.jpg
│   ├── professional-man-*.png/jpg
│   └── professional-woman-*.png/jpg
├── styles/
│   └── globals.css
├── package.json
├── tsconfig.json
├── next.config.mjs
├── postcss.config.mjs
└── README.md
```

### Fluxo de Dados

- **Autenticação:** Simulada via contexto (`auth-context.tsx` e `lib/auth.ts`).
- **Ideias:** Gerenciadas via contexto (`ideas-context.tsx`), com dados mockados e estrutura para fácil integração futura com backend.
- **Sugestões de IA:** Componente dedicado para interação e geração de ideias inovadoras.
- **Analytics:** Painéis dinâmicos para visualização de KPIs, aprovações, implementações e desempenho por área.
- **Rotas protegidas:** Implementadas via componente `protected-route.tsx`.

### Principais Tecnologias

- **Next.js**: Framework React para SSR/SSG e rotas avançadas
- **TypeScript**: Tipagem estática para maior robustez
- **TailwindCSS**: Estilização utilitária e customização de temas
- **Radix UI**: Componentes acessíveis e avançados
- **Lucide React**: Ícones modernos
- **Recharts**: Gráficos e visualização de dados

### Temas e Estilos

- Customização completa de temas claro/escuro via CSS variables e Tailwind
- Componentes visuais Eurofarma (cores, gradientes, badges, cards)

### Estrutura de Componentes

- **Sidebar:** Navegação principal e acesso rápido às áreas do sistema
- **Chat de IA:** Sugestões automáticas e interação com inteligência artificial
- **Cards, Badges, Inputs, etc:** Componentes reutilizáveis para UI consistente

### Contextos Globais

- **AuthContext:** Gerencia autenticação, login/logout, dados do usuário
- **IdeasContext:** Gerencia ideias, status, feedbacks, categorias

### Configurações e Scripts

- `package.json`: Scripts de build/dev/lint/start, dependências
- `tsconfig.json`: Configuração TypeScript
- `next.config.mjs`: Configuração Next.js
- `postcss.config.mjs`: Configuração PostCSS/Tailwind

### Como Executar

1. Instale as dependências:
	```bash
	pnpm install
	```
2. Inicie o servidor de desenvolvimento:
	```bash
	pnpm dev
	```
3. Acesse `http://localhost:3000` no navegador.

### Contribuição

Sugestões e melhorias são bem-vindas! Abra uma issue ou envie um pull request.
