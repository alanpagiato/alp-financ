'use client';

import FormUserGroup from '../components/form';
import { AlertOk } from "@/components/alert";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LoadingModal } from "@/components/loadingModal";

export default function EditUserGroupPage({ params }: { params: { id: string } }) {
  const [initialData, setInitialData] = useState();

  const [loading, setLoading] = useState(true);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const router = useRouter();

  useEffect(() => {
    const fetchUserGroup = async () => {
      try {
        const response = await fetch(`/api/userGroup/${params.id}`);
        if (!response.ok) throw new Error('Erro ao buscar dados do grupo');

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
      const response = await fetch(`/api/userGroup/${params.id}`, {
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
      setAlertMessage("Grupo de usuário editado com sucesso.");
      setAlertVisible(true);

      setTimeout(() => {
        router.push('/userGroup');
      }, 1200);
    } catch (error) {
      console.error('Erro ao editar o grupo de usuário:', error);
    }
  };

  return (
    <>
      <LoadingModal isVisible={loading} />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Editar Grupo de Usuário</h1>
        <FormUserGroup initialData={initialData} onSubmit={handleSubmit} />
        
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
