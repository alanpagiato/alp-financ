'use client';

import FormMovementCode from '../components/form';
import { AlertOk } from "@/components/alert";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LoadingModal } from "@/components/loadingModal";

export default function EditMovementCodePage({ params }: { params: { id: string } }) {
  const [initialData, setInitialData] = useState();

  const [loading, setLoading] = useState(true);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const router = useRouter();

  useEffect(() => {
    const fetchMovementCode = async () => {
      try {
        const response = await fetch(`/api/movementCode/${params.id}`);
        if (!response.ok) throw new Error('Erro ao buscar dados do código de lançamento');

        const data = await response.json();
        setInitialData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovementCode();
  }, [params.id]);

  const handleSubmit = async (data: any) => {
    try {
      const response = await fetch(`/api/movementCode/${params.id}`, {
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
      setAlertMessage("Código de lançamento editado com sucesso.");
      setAlertVisible(true);

      setTimeout(() => {
        router.push('/movementCode');
      }, 1200);
    } catch (error) {
      console.error('Erro ao editar o código de lançamento:', error);
    }
  };

  return (
    <>
      <LoadingModal isVisible={loading} />
      <div className="w-[150%] p-4">
        <h1 className="text-2xl font-bold mb-4">Editar Entidade</h1>
        <FormMovementCode initialData={initialData} onSubmit={handleSubmit} />
        
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
