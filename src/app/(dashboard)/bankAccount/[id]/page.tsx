'use client';

import FormBankAccount from '../components/form';
import { AlertOk } from "@/components/alert";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LoadingModal } from "@/components/loadingModal";

export default function EditBankAccountPage({ params }: { params: { id: string } }) {
  const [initialData, setInitialData] = useState();

  const [loading, setLoading] = useState(true);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const router = useRouter();

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const response = await fetch(`/api/bankAccount/${params.id}`);
        if (!response.ok) throw new Error('Erro ao buscar dados da conta');

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
      const response = await fetch(`/api/bankAccount/${params.id}`, {
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
      
      setAlertTitle("Sucesso!");
      setAlertMessage("Conta bancária editada com sucesso.");
      setAlertVisible(true);

      setTimeout(() => {
        router.push('/bankAccount');
      }, 1200);
    } catch (error) {
      console.error('Erro ao editar a conta bancária:', error);
    }
  };

  return (
    <>
      <LoadingModal isVisible={loading} />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Editar Conta Bancária</h1>
        <FormBankAccount initialData={initialData} onSubmit={handleSubmit} />
        
        <AlertOk 
            title={alertTitle} 
            message={alertMessage} 
            isVisible={alertVisible}
            onClose={() => setAlertVisible(false)} 
          />

      </div>
    </>  
  );
}
