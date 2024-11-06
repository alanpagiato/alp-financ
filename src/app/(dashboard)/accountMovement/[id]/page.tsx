'use client';

import FormAccountMovement from '../components/form';
import { AlertOk } from "@/components/alert";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LoadingModal } from "@/components/loadingModal";

export default function EditAccountMovementPage({ params }: { params: { id: string } }) {
  const [initialData, setInitialData] = useState();

  const [loading, setLoading] = useState(true);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'ok' | 'error'>('ok');

  const router = useRouter();

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const response = await fetch(`/api/accountMovement/${params.id}`);
        if (!response.ok) throw new Error('Erro ao buscar dados do movimento');
        
        const data = await response.json();
        
        setInitialData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccountData();
  }, [params.id]);

  const handleSubmit = async (data: any) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/accountMovement/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const resData = await response.json();
        throw new Error(resData.message || 'Erro ao salvar os dados');
      }
      
      setLoading(false)
      handleShowSuccessAlert("Movimento bancário editado com sucesso.");

    } catch (error) {
      console.error('Erro ao editar o movimento bancário:', error);
      handleShowErrorAlert('Ocorreu um erro ao editar o movimento bancário. Consulte o administrador do sistema.');
      setLoading(false)
    } 
  };
  
  const handleShowSuccessAlert = (message: string) => {
    setAlertTitle("Sucesso!");
    setAlertMessage(message);
    setAlertType("ok");
    setAlertVisible(true);
  };

  const handleShowErrorAlert = (message: string) => {
    setAlertTitle("Erro");
    setAlertMessage(message);
    setAlertType("error");
    setAlertVisible(true);
  };

  const handleAlertClose = () => {
    setAlertVisible(false);
    if (alertType === "ok") {
      router.push('/accountMovement');
    }
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
        <h1 className="text-2xl font-bold mb-4">Editar Conta Bancária</h1>
        <FormAccountMovement initialData={initialData} onSubmit={handleSubmit} />
      </div>
    </>  
  );
}
