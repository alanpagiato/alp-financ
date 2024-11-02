'use client';

import { useState } from 'react';
import { AlertOk } from "@/components/alert";
import FormUserGroup from "../components/form";
import { useRouter } from "next/navigation";

export default function Page() {
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    try {
      const response = await fetch('/api/userGroup', {
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
      setAlertMessage("Grupo de usuário adicionado com sucesso.");
      setAlertVisible(true);

      setTimeout(() => {
        router.push('/userGroup');
      }, 1000);
    } catch (error) {
      console.error('Erro ao salvar o grupo de usuário:', error);

      setAlertTitle("Erro!");
      setAlertMessage("Ocorreu um erro ao adicionar o grupo de usuário.");
      setAlertVisible(true);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Criar Novo Grupo de Usuário</h1>
      <FormUserGroup onSubmit={handleSubmit} />

      <AlertOk 
          title={alertTitle} 
          message={alertMessage} 
          isVisible={alertVisible}
          onClose={() => setAlertVisible(false)} 
        />
    </div>
  );
}
