'use client';

import FormAccountSubPlan from '../components/form';
import { AlertOk } from "@/components/alert";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LoadingModal } from "@/components/loadingModal";

export default function EditAccountSubPlan({ params }: { params: { id: string } }) {
  const [initialData, setInitialData] = useState();

  const [loading, setLoading] = useState(true);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/accountSubPlan/${params.id}`);
        if (!response.ok) throw new Error('Erro ao buscar dados do sub plano');

        const data = await response.json();
        setInitialData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  const handleSubmit = async (data: any) => {
    try {
      const response = await fetch(`/api/accountSubPlan/${params.id}`, {
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
      setAlertMessage("Sub Plano editado com sucesso.");
      setAlertVisible(true);

      setTimeout(() => {
        router.push(`/accountPlan/${params.id}/accountSubPlan`);
      }, 1200);
    } catch (error) {
      console.error('Erro ao editar o sub plano:', error);
    }
  };

  return (
    <>
      <LoadingModal isVisible={loading} />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Editar  Usuário</h1>
        <FormAccountSubPlan initialData={initialData} onSubmit={handleSubmit} planId={ Number(params.id) } />
        
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
