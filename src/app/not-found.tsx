import { Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex items-center justify-center h-screen w-full absolute inset-0 bg-white text-center">
      <div className="flex flex-col items-center">
        <Search className="text-blue-500 w-20 h-20 mb-6" />
        <h1 className="text-3xl font-bold mb-4">Página Não Encontrada</h1>
        <p className="text-gray-700 mb-8 max-w-md">
          A página que você está tentando acessar não existe ou foi movida. Verifique o endereço ou volte para a página inicial.
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
