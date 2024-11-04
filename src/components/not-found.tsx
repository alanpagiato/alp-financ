// app/not-found.tsx

import { Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100%",
        position: "absolute",
        inset: 0,
        backgroundColor: "#ffffff",
        textAlign: "center",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* Ícone de busca */}
        <Search style={{ color: "#3B82F6", width: "80px", height: "80px", marginBottom: "24px" }} />

        {/* Título da página */}
        <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "16px" }}>
          Página Não Encontrada
        </h1>

        {/* Mensagem de erro */}
        <p style={{ color: "#4B5563", marginBottom: "32px", maxWidth: "400px" }}>
          A página que você está tentando acessar não existe ou foi movida. Verifique o endereço ou
          volte para a página inicial.
        </p>

        {/* Botão de retorno */}
        <Link href="/">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 16px",
              border: "1px solid #D1D5DB",
              borderRadius: "4px",
              textDecoration: "none",
              color: "#374151",
              fontSize: "16px",
              fontWeight: "500",
              cursor: "pointer",
              backgroundColor: "transparent",
            }}
          >
            <ArrowLeft style={{ width: "16px", height: "16px" }} />
            Voltar para a Página Inicial
          </Button>
        </Link>
      </div>
    </div>
  );
}
