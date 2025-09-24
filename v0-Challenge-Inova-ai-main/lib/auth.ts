// Simulação de banco de dados de usuários
interface User {
  id: string;
  password: string;
  name: string;
  role: string;
}

// Usuário solicitado pelo cliente
export const users: User[] = [
  {
    id: "551192",
    password: "1234",
    name: "Usuário Teste",
    role: "admin"
  }
];

// Função para verificar as credenciais do usuário
export function verifyCredentials(userId: string, password: string): User | null {
  const user = users.find(u => u.id === userId && u.password === password);
  return user || null;
}