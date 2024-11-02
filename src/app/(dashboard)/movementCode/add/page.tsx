'use client';

import { useState } from 'react';
import { AlertOk } from "@/components/alert";
import FormMovementCode from "../components/form";
import { useRouter } from "next/navigation";

export default function Page() {
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    try {
      const response = await fetch('/api/movementCode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const resData = await response.json();
        throw new Error(resData.message || 'Erro ao salvar os dados');
      }

      setAlertTitle("Sucesso!");
      setAlertMessage("Código de lançamento adicionado com sucesso.");
      setAlertVisible(true);

      setTimeout(() => {
        router.push('/movementCode');
      }, 1000);
    } catch (error) {
      console.error('Erro ao salvar o código de lançamento:', error);

      setAlertTitle("Erro!");
      setAlertMessage("Ocorreu um erro ao adicionar o código de lançamento.");
      setAlertVisible(true);
    }
  };

  return (
    <div className="md:w-[200%] p-4">
      <h1 className="text-2xl font-bold mb-4">Criar Novo Código de Lançamento</h1>
      <FormMovementCode onSubmit={handleSubmit} />

      <AlertOk 
          title={alertTitle} 
          message={alertMessage} 
          isVisible={alertVisible}
          onClose={() => setAlertVisible(false)} 
        />
    </div>
  );
}
