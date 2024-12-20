'use client';

import { useState } from 'react';
import { AlertOk } from "@/components/alert";
import FormEntity from "../components/form";
import { useRouter } from "next/navigation";

export default function Page() {
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    try {
      const response = await fetch('/api/entity', {
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
      setAlertMessage("Entidade adicionada com sucesso.");
      setAlertVisible(true);

      setTimeout(() => {
        router.push('/entity');
      }, 1000);
    } catch (error) {
      console.error('Erro ao salvar a entidade:', error);

      setAlertTitle("Erro!");
      setAlertMessage("Ocorreu um erro ao adicionar a entidade.");
      setAlertVisible(true);
    }
  };

  return (
    <div className="w-[300%] p-4">
      <h1 className="text-2xl font-bold mb-4">Criar Nova Entidade</h1>
      <FormEntity onSubmit={handleSubmit} />

      <AlertOk 
          title={alertTitle} 
          message={alertMessage} 
          isVisible={alertVisible}
          onClose={() => setAlertVisible(false)} 
        />
    </div>
  );
}
