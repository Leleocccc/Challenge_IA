import ProtectedRoute from "@/components/auth/protected-route";
import { Sidebar } from "@/components/layout/sidebar";
import { IdeasProvider } from "@/contexts/ideas-context";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <IdeasProvider>
        <div className="flex h-screen">
          <Sidebar />
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </IdeasProvider>
    </ProtectedRoute>
  );
}