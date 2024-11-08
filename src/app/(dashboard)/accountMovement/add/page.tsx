'use client';

import { useState } from 'react';
import { AlertOk } from "@/components/alert";
import FormAccountMovement from "../components/form";
import { useRouter } from "next/navigation";
import { LoadingModal } from '@/components/loadingModal';

import { AccountMovementSplit } from '@/types/accountMovement';

export default function Page() {
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'ok' | 'error'>('ok');
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();

  const handleSubmit = async (data: any, splitData: AccountMovementSplit[]) => {
    try {
      setLoading(true)
      const response = await fetch('/api/accountMovement', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        setLoading(false)
        const resData = await response.json();
        throw new Error(resData.message || 'Erro ao salvar os dados da movimentação bancária');
      }

      const accountMovementData = await response.json();
      const accountMovementId = accountMovementData.id;

      const updatedSplitData = splitData.map((item) => ({
        ...item,
        accountMovementId
      }));

      const bulkResponse = await fetch('/api/accountMovementSplit/bulk', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedSplitData),
      });

      if (!bulkResponse.ok) {
        setLoading(false);
        const resData = await bulkResponse.json();
        throw new Error(resData.message || 'Erro ao salvar os dados das divisões do movimento bancário.');
      }

      setLoading(false)
      handleShowSuccessAlert("Movimento bancário adicionado com sucesso.");
      
    } catch (error) {
      console.error('Erro ao salvar o movimento bancário:', error);
      setLoading(false)
      handleShowErrorAlert('Ocorreu um erro ao adicionar o movimento bancário. Consulte o administrador do sistema.');
    }
  };

  const handleShowSuccessAlert = (message: string) => {
    setAlertTitle("Sucesso!");
    setAlertMessage(message);
    setAlertType("ok");
    setAlertVisible(true);
  };

  const handleAlertClose = () => {
    setAlertVisible(false);
    if (alertType === "ok") {
      router.push('/accountMovement');
    }
  };

  const handleShowErrorAlert = (message: string) => {
    setAlertTitle("Erro");
    setAlertMessage(message);
    setAlertType("error");
    setAlertVisible(true);
  };

  return (
    <>
      <LoadingModal isVisible={loading} />
      <AlertOk 
        title={alertTitle} 
        message={alertMessage} 
        isVisible={alertVisible}
        type={alertType}
        onClose={handleAlertClose} 
      />
      
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Criar Novo Movimento Bancário</h1>
        <FormAccountMovement onSubmit={handleSubmit} />
      </div>
    </>
  );
}
