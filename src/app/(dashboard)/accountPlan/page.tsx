'use client';

import { useEffect, useState } from "react";

import { AccountPlan, columns } from "./components/columns"
import { DataTable } from "./components/data-table"
import { AlertOk } from "@/components/alert";
import { ConfirmAlert } from "@/components/alertConfirm";
import { LoadingModal } from "@/components/loadingModal";

export default function Page() {
  const [data, setData] = useState<AccountPlan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'ok' | 'error'>('ok');

  const [confirmVisible, setConfirmVisible] = useState(false);
  const [confirmId, setConfirmId] = useState<number | null>(null);
  
  useEffect(() => {
    fetchData()
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        handleShowErrorAlert(err.message);
        setLoading(false);
      });
  }, []);

  async function fetchData(): Promise<AccountPlan[]> {
    const response = await fetch('/api/accountPlan');
    if (!response.ok) {
      handleShowErrorAlert('Falha ao buscar os dados');
      throw new Error('Falha ao buscar os dados');
    }
    return response.json();
  }

  const handleDeleteRequest = (id: number) => {
    setConfirmId(id);
    setConfirmVisible(true);
  };

  const confirmDelete = async () => {
    if (confirmId === null) return;
    setConfirmVisible(false);

    try {
      const response = await fetch(`/api/accountPlan/${confirmId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        handleShowErrorAlert('Erro ao excluir plano de contas');
        throw new Error('Erro ao excluir plano de contas');
      }
  
      handleShowSuccessAlert("Plano de contas excluído com sucesso.");
  
      setData((prevData) => prevData.filter(accountPlan => accountPlan.id !== confirmId));
    } catch (error) {
      console.error('Erro ao excluir o plano de contas:', error);
      handleShowErrorAlert('Erro ao excluir o plano de contas');
    }
  };

  const cancelDelete = () => {
    setConfirmVisible(false);
    setConfirmId(null);
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

  return (
    <>
      <LoadingModal isVisible={loading} />
      <div className="h-full w-full flex flex-col space-y-1 p-5 overflow-y-auto">
          <h2 className="text-2xl font-bold tracking-tight">Plano de Contas</h2>
          <DataTable
            columns={columns({ deleteAccountPlan: handleDeleteRequest })} 
            data={data} 
          />
          
          <AlertOk 
            title={alertTitle} 
            message={alertMessage} 
            isVisible={alertVisible}
            type={alertType}
            onClose={() => setAlertVisible(false)} 
          />
          
          {confirmVisible && (
            <ConfirmAlert 
              title="Confirmação de Exclusão"
              message="Você tem certeza que deseja excluir este plano?"
              isOpen={confirmVisible}
              onConfirm={confirmDelete}
              onCancel={cancelDelete} 
            />
          )}
      </div>
    </>
  )
}
