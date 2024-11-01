'use client';

import { useState } from 'react';
import { AlertOk } from "@/components/alert";
import FormAccountSubPlan from "../components/form";
import { useRouter } from "next/navigation";

export default function Page({ params }: { params: { id: string } }) {
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    try {
      const response = await fetch('/api/accountSubPlan', {
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
      setAlertMessage("Sub Plano adicionado com sucesso.");
      setAlertVisible(true);

      setTimeout(() => {
        router.push(`/accountPlan/${params.id}/accountSubPlan`);
      }, 1000);
    } catch (error) {
      console.error('Erro ao salvar o usuário:', error);

      setAlertTitle("Erro!");
      setAlertMessage("Ocorreu um erro ao adicionar o usuário.");
      setAlertVisible(true);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Criar Novo Sub Plano de Contas</h1>
      <FormAccountSubPlan onSubmit={handleSubmit} planId={ Number( params.id ) } />

      <AlertOk 
          title={alertTitle} 
          message={alertMessage} 
          isVisible={alertVisible}
          onClose={() => setAlertVisible(false)} 
        />
    </div>
  );
}
