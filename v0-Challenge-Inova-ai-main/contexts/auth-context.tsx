"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Dados de usuário simulados para teste
const users = [
  {
    id: "12345",
    name: "João Silva",
    email: "joao.silva@eurofarma.com.br",
    role: "Gerente",
    department: "Marketing",
    password: "senha123",
    manager: {
      id: "99999",
      name: "Carlos Mendes",
      role: "Diretor",
      department: "Marketing"
    },
    team: [
      { id: "11111", name: "Ana Costa", role: "Analista", department: "Marketing" },
      { id: "22222", name: "Pedro Santos", role: "Coordenador", department: "Marketing" }
    ]
  },
  {
    id: "67890",
    name: "Maria Oliveira",
    email: "maria.oliveira@eurofarma.com.br",
    role: "Analista",
    department: "P&D",
    password: "senha456",
    manager: {
      id: "33333",
      name: "Roberto Lima",
      role: "Gerente",
      department: "P&D"
    },
    team: []
  },
  {
    id: "551192",
    name: "Usuário de Teste",
    email: "teste@eurofarma.com.br",
    role: "Colaborador",
    department: "TI",
    password: "1234",
    manager: {
      id: "44444",
      name: "Fernanda Alves",
      role: "Gerente",
      department: "TI"
    },
    team: [
      { id: "55555", name: "Lucas Pereira", role: "Desenvolvedor", department: "TI" },
      { id: "66666", name: "Camila Souza", role: "Analista de Sistemas", department: "TI" }
    ]
  },
];

// Função para verificar credenciais
const verifyCredentials = (userId: string, password: string) => {
  return users.find(user => user.id === userId && user.password === password);
};

interface User {
  id: string;
  name: string;
  role: string;
  email?: string;
  department?: string;
  manager?: {
    id: string;
    name: string;
    role: string;
    department: string;
  };
  team?: Array<{
    id: string;
    name: string;
    role: string;
    department: string;
  }>;
}

interface AuthContextType {
  user: User | null;
  login: (userId: string, password: string, rememberMe?: boolean) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificar se o usuário já está autenticado ao carregar a página
  useEffect(() => {
    // Verificar primeiro no localStorage (usuário com "lembrar-me")
    let storedUser = localStorage.getItem("user");
    
    // Se não encontrar no localStorage, verificar no sessionStorage
    if (!storedUser) {
      storedUser = sessionStorage.getItem("user");
    }
    
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Erro ao recuperar usuário:", error);
        localStorage.removeItem("user");
        sessionStorage.removeItem("user");
      }
    }
  }, []);

  const login = async (userId: string, password: string, rememberMe = false): Promise<boolean> => {
    // Simular uma chamada de API com um pequeno delay
    return new Promise((resolve) => {
      setTimeout(() => {
        const authenticatedUser = verifyCredentials(userId, password);
        
        if (authenticatedUser) {
          const { password: _, ...userWithoutPassword } = authenticatedUser;
          setUser(userWithoutPassword);
          setIsAuthenticated(true);
          
          // Salvar no localStorage apenas se rememberMe estiver ativado
          if (rememberMe) {
            localStorage.setItem("user", JSON.stringify(userWithoutPassword));
          } else {
            // Usar sessionStorage se não quiser lembrar (será apagado quando o navegador fechar)
            sessionStorage.setItem("user", JSON.stringify(userWithoutPassword));
          }
          
          resolve(true);
        } else {
          resolve(false);
        }
      }, 500); // Delay de 500ms para simular uma chamada de API
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}