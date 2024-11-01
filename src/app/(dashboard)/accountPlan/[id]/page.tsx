'use client';

import FormAccountPlan from '../components/form';
import { AlertOk } from "@/components/alert";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LoadingModal } from "@/components/loadingModal";

export default function EditAccountPlanPage({ params }: { params: { id: string } }) {
  const [initialData, setInitialData] = useState();

  const [loading, setLoading] = useState(true);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const router = useRouter();

  useEffect(() => {
    const fetchUserGroup = async () => {
      try {
        const response = await fetch(`/api/accountPlan/${params.id}`);
        if (!response.ok) throw new Error('Erro ao buscar dados do plano');

        const data = await response.json();
        setInitialData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserGroup();
  }, [params.id]);

  const handleSubmit = async (data: any) => {
    try {
      const response = await fetch(`/api/accountPlan/${params.id}`, {
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
      setAlertMessage("Plano de contas editado com sucesso.");
      setAlertVisible(true);

      setTimeout(() => {
        router.push('/accountPlan');
      }, 1200);
    } catch (error) {
      console.error('Erro ao editar o plano de contas:', error);
    }
  };

  return (
    <>
      <LoadingModal isVisible={loading} />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Editar Plano de Contas</h1>
        <FormAccountPlan initialData={initialData} onSubmit={handleSubmit} />
        
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
