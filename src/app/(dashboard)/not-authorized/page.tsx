import { AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotAuthorizedPage() {
  return (
    <div className="flex items-center justify-center h-screen w-full absolute inset-0 bg-white text-center">
      <div className="flex flex-col items-center">
        <AlertCircle className="text-red-500 w-20 h-20 mb-6" />
        <h1 className="text-3xl font-bold mb-4">Acesso Não Autorizado</h1>
        <p className="text-gray-700 mb-8 max-w-md">
          Você não tem permissão para acessar esta página. Se precisar de acesso, entre em contato com o administrador.
        </p>
        <Link href="/">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Voltar para a Página Inicial
          </Button>
        </Link>
      </div>
    </div>
  );
}
