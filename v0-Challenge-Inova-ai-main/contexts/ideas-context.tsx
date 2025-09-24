"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Tipos para as ideias
export interface Idea {
  id: number;
  title: string;
  category: string;
  status: string;
  statusColor: string;
  submittedAt: string;
  views: number;
  comments: number;
  description: string;
  feedback: string;
  userId: string; // ID do usuário que criou a ideia
  authorName?: string; // Nome do autor da ideia
  authorAvatar?: string; // Avatar do autor
}

// Dados iniciais de ideias
const initialIdeas: Idea[] = [
  {
    id: 1,
    title: "Sistema de Rastreamento de Medicamentos",
    category: "Tecnologia",
    status: "Em Avaliação",
    statusColor: "bg-yellow-100 text-yellow-800",
    submittedAt: "15 Jan 2024",
    views: 23,
    comments: 5,
    description: "Implementação de blockchain para rastreamento completo da cadeia de medicamentos",
    feedback: "Ideia interessante, aguardando análise técnica do departamento de TI.",
    userId: "12345",
    authorName: "Carlos Silva",
    authorAvatar: "/professional-man.png"
  },
  {
    id: 2,
    title: "Programa de Sustentabilidade Verde",
    category: "Sustentabilidade",
    status: "Aprovada",
    statusColor: "bg-green-100 text-green-800",
    submittedAt: "08 Jan 2024",
    views: 45,
    comments: 12,
    description: "Iniciativa para reduzir pegada de carbono nas operações da empresa",
    feedback: "Aprovada para implementação no Q2. Parabéns pela iniciativa!",
    userId: "12345",
    authorName: "Carlos Silva",
    authorAvatar: "/professional-man.png"
  },
  {
    id: 3,
    title: "App de Telemedicina Interna",
    category: "Saúde Digital",
    status: "Em Desenvolvimento",
    statusColor: "bg-blue-100 text-blue-800",
    submittedAt: "02 Jan 2024",
    views: 67,
    comments: 18,
    description: "Plataforma para consultas médicas remotas para colaboradores",
    feedback: "Em desenvolvimento pela equipe de produtos digitais. Previsão de lançamento em março.",
    userId: "67890",
    authorName: "Ana Oliveira",
    authorAvatar: "/professional-woman-diverse.png"
  },
  {
    id: 4,
    title: "Otimização de Processos com IA",
    category: "Tecnologia",
    status: "Rejeitada",
    statusColor: "bg-red-100 text-red-800",
    submittedAt: "28 Dez 2023",
    views: 34,
    comments: 8,
    description: "Uso de machine learning para otimizar processos de produção",
    feedback: "Infelizmente não aprovada devido a limitações orçamentárias. Sugerimos reenviar no próximo ciclo.",
    userId: "12345",
    authorName: "Carlos Silva",
    authorAvatar: "/professional-man.png"
  },
];

// Mapeamento de categorias para o formulário
export const categoryMapping: Record<string, string> = {
  "Tecnologia e Inovação": "Tecnologia",
  "Sustentabilidade": "Sustentabilidade",
  "Processos e Operações": "Processos",
  "Produtos e Serviços": "Produtos",
  "Recursos Humanos": "RH",
  "Saúde e Segurança": "Saúde Digital",
  "Marketing e Vendas": "Marketing",
  "Pesquisa e Desenvolvimento": "P&D",
};

// Mapeamento de status para cores
export const statusColorMapping: Record<string, string> = {
  "Em Avaliação": "bg-yellow-100 text-yellow-800",
  "Aprovada": "bg-green-100 text-green-800",
  "Em Desenvolvimento": "bg-blue-100 text-blue-800",
  "Rejeitada": "bg-red-100 text-red-800",
};

interface IdeasContextType {
  ideas: Idea[];
  addIdea: (idea: Omit<Idea, "id" | "views" | "comments" | "status" | "statusColor" | "submittedAt" | "feedback" | "authorName" | "authorAvatar">) => void;
  getUserIdeas: (userId: string) => Idea[];
  getAllIdeas: () => Idea[];
}

export const IdeasContext = createContext<IdeasContextType | undefined>(undefined);

export function useIdeas() {
  const context = useContext(IdeasContext);
  if (!context) {
    throw new Error("useIdeas must be used within an IdeasProvider");
  }
  return context;
}

interface IdeasProviderProps {
  children: ReactNode;
}

export function IdeasProvider({ children }: IdeasProviderProps) {
  const [ideas, setIdeas] = useState<Idea[]>(() => {
    // Tenta recuperar ideias do localStorage se estiver no cliente
    if (typeof window !== "undefined") {
      const savedIdeas = localStorage.getItem("ideas");
      return savedIdeas ? JSON.parse(savedIdeas) : initialIdeas;
    }
    return initialIdeas;
  });

  // Salva ideias no localStorage quando elas mudam
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("ideas", JSON.stringify(ideas));
    }
  }, [ideas]);

  // Adiciona uma nova ideia
  const addIdea = (newIdea: Omit<Idea, "id" | "views" | "comments" | "status" | "statusColor" | "submittedAt" | "feedback" | "authorName" | "authorAvatar">) => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'short' })} ${currentDate.getFullYear()}`;
    
    const idea: Idea = {
      ...newIdea,
      id: ideas.length > 0 ? Math.max(...ideas.map(idea => idea.id)) + 1 : 1,
      status: "Em Avaliação",
      statusColor: statusColorMapping["Em Avaliação"],
      submittedAt: formattedDate,
      views: 0,
      comments: 0,
      feedback: "Aguardando análise inicial da equipe de inovação.",
      authorName: "Carlos Silva",
      authorAvatar: "/professional-man.png",
    };

    setIdeas(prevIdeas => [...prevIdeas, idea]);
  };

  // Obtém ideias de um usuário específico
  const getUserIdeas = (userId: string) => {
    return ideas.filter(idea => idea.userId === userId);
  };

  // Obtém todas as ideias
  const getAllIdeas = () => {
    return ideas;
  };

  return (
    <IdeasContext.Provider value={{ ideas, addIdea, getUserIdeas, getAllIdeas }}>
      {children}
    </IdeasContext.Provider>
  );
}