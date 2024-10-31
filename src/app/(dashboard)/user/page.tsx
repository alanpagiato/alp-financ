'use client';

import { useEffect, useState } from "react";

import { User, columns } from "./components/columns"
import { DataTable } from "./components/data-table"
import { AlertOk } from "@/components/alert";
import { ConfirmAlert } from "@/components/alertConfirm";
import { LoadingModal } from "@/components/loadingModal";

export default function Page() {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const [confirmVisible, setConfirmVisible] = useState(false);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [groupMap, setGroupMap] = useState<Record<number, string>>({});
  
  useEffect(() => {
    
    Promise.all([fetchData(), fetchGroups()])
      .then(([users, groups]) => {
        setData(users);

        // Cria o mapa de grupos usando os dados recebidos
        const groupMapping: Record<number, string> = {};
        groups.forEach(group => {
          groupMapping[group.id] = group.name;
        });
        setGroupMap(groupMapping);

        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  async function fetchData(): Promise<User[]> {
    const response = await fetch('/api/user');
    if (!response.ok) {
      throw new Error('Falha ao buscar os dados');
    }
    return response.json();
  }

  async function fetchGroups(): Promise<{ id: number; name: string }[]> {
    const response = await fetch('/api/userGroup');
    if (!response.ok) {
      throw new Error('Falha ao buscar os grupos');
    }
    return response.json();
  }

  const handleDeleteRequest = (id: string) => {
    setConfirmId(id);
    setConfirmVisible(true);
  };

  const confirmDelete = async () => {
    if (confirmId === null) return;
    setConfirmVisible(false);

    try {
      const response = await fetch(`/api/user/${confirmId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Erro ao excluir conta bancária');
      }
  
      setAlertTitle("Sucesso!");
      setAlertMessage("Usuário excluído com sucesso.");
      setAlertVisible(true);
  
      setData((prevData) => prevData.filter(user => user.id !== confirmId));
      setTimeout(() => setAlertVisible(false), 1200);
    } catch (error) {
      console.error('Erro ao excluir o usuário:', error);
      alert('Erro ao excluir o usuário');
    }
  };

  const cancelDelete = () => {
    setConfirmVisible(false);
    setConfirmId(null);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <LoadingModal isVisible={loading} />
      <div className="h-full w-full flex flex-col space-y-1 p-5 overflow-y-auto">
          <h2 className="text-2xl font-bold tracking-tight">Grupos de Usuários</h2>
          <DataTable
            columns={columns({ deleteUser: handleDeleteRequest, groupMap })} 
            data={data} 
          />
          
          <AlertOk 
            title={alertTitle} 
            message={alertMessage} 
            isVisible={alertVisible}
            onClose={() => setAlertVisible(false)} 
          />
          
          {confirmVisible && (
            <ConfirmAlert 
              title="Confirmação de Exclusão"
              message="Você tem certeza que deseja excluir este usuário?"
              isOpen={confirmVisible}
              onConfirm={confirmDelete}
              onCancel={cancelDelete} 
            />
          )}
      </div>
    </>
  )
}
