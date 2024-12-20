'use client';

import FormEntity from '../components/form';
import { AlertOk } from "@/components/alert";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LoadingModal } from "@/components/loadingModal";

export default function EditEntityPage({ params }: { params: { id: string } }) {
  const [initialData, setInitialData] = useState();

  const [loading, setLoading] = useState(true);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const router = useRouter();

  useEffect(() => {
    const fetchEntity = async () => {
      try {
        const response = await fetch(`/api/entity/${params.id}`);
        if (!response.ok) throw new Error('Erro ao buscar dados da entidade');

        const data = await response.json();
        setInitialData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEntity();
  }, [params.id]);

  const handleSubmit = async (data: any) => {
    try {
      const response = await fetch(`/api/entity/${params.id}`, {
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
      setAlertMessage("Entidade editada com sucesso.");
      setAlertVisible(true);

      setTimeout(() => {
        router.push('/entity');
      }, 1200);
    } catch (error) {
      console.error('Erro ao editar a entidade:', error);
    }
  };

  return (
    <>
      <LoadingModal isVisible={loading} />
      <div className="w-[300%] p-4">
        <h1 className="text-2xl font-bold mb-4">Editar Entidade</h1>
        <FormEntity initialData={initialData} onSubmit={handleSubmit} />
        
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
