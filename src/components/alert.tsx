'use client';

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, AlertTriangle } from "lucide-react"; // Ícones para sucesso e erro

interface AlertOkProps {
  title: string;
  message: string;
  isVisible: boolean;
  type: "ok" | "error";
  onClose: () => void;
}

export function AlertOk({ title, message, isVisible, type, onClose }: AlertOkProps) {
  if (!isVisible) return null;

  // Define a cor do botão com base no tipo de alerta
  const buttonColor = type === "ok" ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600";

  // Seleciona o ícone e a cor do ícone de acordo com o tipo de alerta
  const Icon = type === "ok" ? CheckCircle : AlertTriangle;
  const iconColor = type === "ok" ? "text-green-500" : "text-red-500";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <Alert 
        className="flex flex-col items-center text-center p-6 bg-white rounded-md shadow-lg max-w-sm" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center mb-4">
          {/* Ícone de sucesso ou erro, posicionado à esquerda do título */}
          <Icon className={`h-6 w-6 mr-2 ${iconColor}`} />
          <AlertTitle className="font-semibold text-lg">{title}</AlertTitle> {/* Aumenta o tamanho da fonte */}
        </div>
        <AlertDescription className="mt-2 text-gray-600">{message}</AlertDescription>

        {/* Botão "OK" com cor definida pelo tipo de alerta */}
        <button
          onClick={onClose}
          className={`mt-4 px-4 py-2 text-white rounded ${buttonColor}`}
        >
          OK
        </button>
      </Alert>
    </div>
  );
}
